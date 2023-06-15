package com.example.klas_server.User;

import org.springframework.util.Assert;

record SignInKakaoRequest(Integer userId, String code) {
    SignInKakaoRequest {
        Assert.notNull(userId, "id는 필수입니다.");
        Assert.hasText(code, "인증코드에 문제가 있습니다.");
    }
}
