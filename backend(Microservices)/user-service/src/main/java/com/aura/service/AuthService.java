package com.aura.service;

import com.aura.payload.request.SignupDto;
import com.aura.payload.response.AuthResponse;

public interface AuthService {
    AuthResponse login(String username, String password) throws Exception;
    AuthResponse signup(SignupDto req) throws Exception;
    AuthResponse getAccessTokenFromRefreshToken(String refreshToken) throws Exception;
}
