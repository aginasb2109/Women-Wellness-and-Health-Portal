package com.aginas.SERVER_WHAMP.controller;

import com.aginas.SERVER_WHAMP.models.User;
import com.aginas.SERVER_WHAMP.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    UserService service;

    @PostMapping("/login")
    public ResponseEntity<Optional<User>> login(@RequestParam String username, @RequestParam String password) {
        Optional<User> user = service.login(username, password);

        if (user != null) {
            return ResponseEntity.ok(user); // ✅ return user object if login is successful
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("register")
    public String register(@RequestParam String username, @RequestParam String password, @RequestParam String role){
        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);
        return service.register(user);
    }
}
