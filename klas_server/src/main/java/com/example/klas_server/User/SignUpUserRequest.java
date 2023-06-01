package com.example.klas_server.User;

import org.springframework.util.Assert;

record SignUpUserRequest(String name, Integer userId, String password, UserType userType) {
    SignUpUserRequest {
        Assert.hasText(name, "이름은 필수입니다.");
        Assert.notNull(userId, "id는 필수입니다.");
        Assert.hasText(password, "비밀번호는 필수입니다.");
        Assert.notNull(userType, "사용자 유형은 필수입니다.");
    }
}
