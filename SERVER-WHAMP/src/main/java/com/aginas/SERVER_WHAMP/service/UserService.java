package com.aginas.SERVER_WHAMP.service;

import com.aginas.SERVER_WHAMP.models.User;
import com.aginas.SERVER_WHAMP.repository.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public String register(User user) {

        if(repo.findByUsername(user.getUsername()).isPresent())
            return "Username already exists";

        if(user.getRole() == null || user.getRole().isEmpty())
            user.setRole("USER"); // default role

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        repo.save(user);
        return "User registered successfully";
    }
}
