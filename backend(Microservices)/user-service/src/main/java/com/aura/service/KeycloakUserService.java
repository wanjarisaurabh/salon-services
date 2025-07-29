package com.aura.service;

/*
* getting admin token
* creating user -- userrequest , creadential
* getting user from user name
* getting role
* then assgining them
*/

import com.aura.payload.dto.KeycloakRole;
import com.aura.payload.dto.KeycloakUserDTO;
import com.aura.payload.dto.KeycloakUserinfo;
import com.aura.payload.request.Credential;
import com.aura.payload.request.SignupDto;
import com.aura.payload.request.UserRequest;
import com.aura.payload.response.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeycloakUserService {


    //urls--

    private static final String KEYCLOAK_BASE_URL="http://localhost:8080";

    private static final String KEYCLOAK_ADMIN_API = KEYCLOAK_BASE_URL+"/admin/realms/master/users";

    private static final String TOKEN_URL = KEYCLOAK_BASE_URL+"/realms/master/protocol/openid-connect/token";
    private static final String CLIENT_ID = "salon-booking-client"; // Replace with your client ID
    private static final String CLIENT_SECRET = "OQBzZAs91ilJngVbYpmuLGBtvObd3oHA"; // Replace with your client secret
    private static final String GRANT_TYPE = "password";
    private static final String scope = "openid email profile"; // Adjust grant type if necessary
    private static final String username = "admin@gmail.com";
    private static final String password = "admin";
    private static  final String clientId = "37574f77-cf57-4013-a079-0d685b98c177";


//for calling
    private final RestTemplate restTemplate;


    public void createUser(SignupDto signupDto) throws Exception {

        //Admin acces_token required for creating user
        String ACCESS_TOKEN = getAdminAccessToken(
                username,
                password,
                GRANT_TYPE,null).getAccessToken();

        System.out.println("access token: " + ACCESS_TOKEN);


        //required for setting it in the userRequest
        Credential credential = new Credential();
        credential.setTemporary(false);
        credential.setType("password");
        credential.setValue(signupDto.getPassword());

        UserRequest userRequest=new UserRequest();
        userRequest.setEmail(signupDto.getEmail());
        userRequest.setEnabled(true);
        userRequest.setUsername(signupDto.getUsername());
        userRequest.getCredentials().add(credential);



        RestTemplate restTemplate = new RestTemplate();

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(ACCESS_TOKEN); //sending access token of admin

        // Create HTTP entity
        HttpEntity<UserRequest> requestEntity = new HttpEntity<>(userRequest, headers);


        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    KEYCLOAK_ADMIN_API,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );
            System.out.println("User created successfully!");
            KeycloakUserDTO user=fetchFirstUserByUsername(
                    signupDto.getUsername(),
                    ACCESS_TOKEN
            );
            KeycloakRole role=getRoleByName(
                    clientId,
                    ACCESS_TOKEN,
                    signupDto.getRole().toString()
            );
            //list , since keyclock required array , or able to assign multiple role
            List<KeycloakRole> roles=new ArrayList<>();
            roles.add(role);
            assignRoleToUser(
                    user.getId(),
                    clientId,
                    roles,
                    ACCESS_TOKEN
            );

        } catch (Exception e) {
            // Handle HTTP 4xx errors
            System.err.println("Client error: " + e.getMessage());
            throw new Exception(e.getMessage());

        }


    }


    //it will give the acces token for all user not only for Admin
    public TokenResponse getAdminAccessToken(String username,
                                             String password,
                                             String grantType,
                                             String refreshToken) throws Exception {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", CLIENT_ID);

        if (CLIENT_SECRET != null && !CLIENT_SECRET.isEmpty()) {
            requestBody.add("client_secret", CLIENT_SECRET);
        }

        requestBody.add("grant_type", grantType);

        if ("password".equals(grantType)) {
            requestBody.add("username", username);
            requestBody.add("password", password);
        } else if ("refresh_token".equals(grantType)) {
            requestBody.add("refresh_token", refreshToken);
        }

        // Optional scope
        if (scope != null && !scope.isEmpty()) {
            requestBody.add("scope", scope);
        }

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<TokenResponse> response = restTemplate.exchange(
                    TOKEN_URL,
                    HttpMethod.POST,
                    requestEntity,
                    TokenResponse.class
            );
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Client error: " + e.getMessage());
            throw new Exception(e.getMessage());
        }
    }


    public KeycloakRole getRoleByName(String clientId, String token,String role) throws Exception {


        // Endpoint URL
        String url=KEYCLOAK_BASE_URL+"/admin/realms/master/clients/{clientId}/roles/{role}";
        // Create headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Accept", "application/json");

        // Create the HTTP entity
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {

            ResponseEntity<KeycloakRole> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    requestEntity,
                    KeycloakRole.class,
                    clientId,
                    role
            );
            return response.getBody();
        } catch (Exception e) {

            System.err.println("Client error: " + e.getMessage());
            throw new Exception(e.getMessage());

        }
    }

    public KeycloakUserDTO fetchFirstUserByUsername(String username,String token) throws Exception {
        String url = KEYCLOAK_BASE_URL+"/admin/realms/master/users?username=" + username;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        // Create an HttpEntity with the headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            // Send the GET request
            ResponseEntity<KeycloakUserDTO[]> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    KeycloakUserDTO[].class
            );

            // Extract and return the first user object
            KeycloakUserDTO[] users = response.getBody();
            if (users != null && users.length > 0) {
                return users[0]; // Return the first user
            } else {
                throw new Exception("No users found for username: " + username);
            }

        } catch (Exception e) {

            throw new Exception("Failed to fetch user details: " + e.getMessage());
        }
    }


    public void assignRoleToUser(String userId,
                                 String clientId,
                                 List<KeycloakRole> roles,
                                 String token) throws Exception {
        String url = KEYCLOAK_BASE_URL+"/admin/realms/master/users/" + userId +
                "/role-mappings/clients/" + clientId;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);


        HttpEntity<List<KeycloakRole>> entity = new HttpEntity<>(roles, headers);

        try {

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );


            response.getStatusCode();

        } catch (Exception e) {

            throw new Exception("Failed to assign roles: " + e.getMessage());
        }
    }

    public KeycloakUserinfo fetchUserProfileByJwt(String token) throws Exception {
        System.out.println("keycloak profile token "+ token);
        String url = KEYCLOAK_BASE_URL+"/realms/master/protocol/openid-connect/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization",  token);


        // Create an HttpEntity with the headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            // Send the GET request
            ResponseEntity<KeycloakUserinfo> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    KeycloakUserinfo.class
            );

            // Extract and return the first user object
            return response.getBody();

        } catch (Exception e) {
            System.out.println("Failed to fetch user details: " + e.getMessage());
            throw new Exception("Failed to fetch user details: " + e.getMessage());
        }
    }


}


