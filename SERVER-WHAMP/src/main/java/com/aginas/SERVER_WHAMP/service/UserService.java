package com.aginas.SERVER_WHAMP.service;

import com.aginas.SERVER_WHAMP.models.User;
import com.aginas.SERVER_WHAMP.repository.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    Userrepository repo;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Optional<User> login(String username, String password) {
        Optional<User> user = repo.findByUsername(username);

        if (user.isPresent()) {
            User u = user.get();



            if (passwordEncoder.matches(password, u.getPassword())) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }



    public ResponseEntity<Optional<User>> register(User user) {

        // Check if username already exists
        Optional<User> existingUser = repo.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            // Return the existing user inside Optional
            return ResponseEntity.status(HttpStatus.CONFLICT).body(existingUser);
        }

        // Set default role if not provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save new user
        User savedUser = repo.save(user);

        // Return saved user wrapped in Optional
        return ResponseEntity.ok(Optional.of(savedUser));
    }



}
