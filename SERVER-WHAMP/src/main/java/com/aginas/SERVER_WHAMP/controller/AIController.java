package com.aginas.SERVER_WHAMP.controller;

import com.aginas.SERVER_WHAMP.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/Ai")
public class AIController {

    @Autowired
    AiService service;

    
    @PostMapping("/nutrition")
    public String getNutritionAdvice(@RequestBody Map<String, String> request) {
        String query = request.get("query");
        if (query == null || query.trim().isEmpty()) {
            return "Query cannot be empty!";
        }
        return service.getNutritionAdvice(query);
    }


}

