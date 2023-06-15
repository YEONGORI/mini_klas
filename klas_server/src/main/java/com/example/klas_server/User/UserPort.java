package com.example.klas_server.User;

interface UserPort {
    void save(final User user);

    int checkId(final int userid);
}
