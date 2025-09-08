package com.aura.config;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
public class UserContextFilter extends AbstractGatewayFilterFactory<UserContextFilter.Config> {

    public UserContextFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // Extract the SecurityContext from the request
            var principal = exchange.getPrincipal()
                    .cast(org.springframework.security.core.Authentication.class); // Get the authenticated user

            return principal.flatMap(authentication -> {
                // Check if the principal is a JWT token
                if (authentication.getPrincipal() instanceof org.springframework.security.oauth2.jwt.Jwt) {
                    var jwt = (org.springframework.security.oauth2.jwt.Jwt) authentication.getPrincipal();

                    // Extract claims from the JWT

                    String email = jwt.getClaimAsString("email"); // Email from the token
//                    String roles = String.join(",", jwt.getClaimAsStringList("roles")); // Roles as CSV

                    System.out.println("+++++==================== "+"-----"+email);

                    // Add extracted details to request headers
                    var mutatedRequest= exchange.getRequest().mutate()
                            .header("X-User-Email", email) // Custom header for email
//                            .header("X-User-Roles", roles)
                            .build();
                    return chain.filter(exchange.mutate().request(mutatedRequest).build());
                }
                System.out.println("Headers being forwarded: " + exchange.getRequest()
                        .getHeaders());

                // Continue the filter chain
                return chain.filter(exchange);
            });
        };
    }

    public static class Config {
        // You can add filter-specific configurations here if needed
    }
}
