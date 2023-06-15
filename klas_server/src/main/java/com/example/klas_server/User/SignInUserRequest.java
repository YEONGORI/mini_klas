package com.example.klas_server.User;

import org.springframework.util.Assert;

record SignInUserRequest(User user) {
    SignInUserRequest {
        System.out.println(user.getUserId());
        System.out.println(user.getPassword());
        Assert.notNull(user.getUserId(), "id는 필수입니다.");
        Assert.hasText(user.getPassword(), "비밀번호는 필수입니다.");
    }
}
