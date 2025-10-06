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


    @PostMapping("/advice")
    public String getPeriodAdvice(@RequestBody Map<String, String> request) {
        String startDate = request.get("startDate");
        String endDate = request.get("endDate");
        String notes = request.get("notes");

        if (startDate == null || endDate == null || startDate.isEmpty() || endDate.isEmpty()) {
            return "Start date and end date are required!";
        }

        // AI Prompt – personalize advice based on cycle info
        String prompt = "You are a friendly health assistant specialized in women's menstrual cycles. " +
                "A user had a period starting on " + startDate + " and ending on " + endDate +
                (notes != null && !notes.isEmpty() ? ". They noted: " + notes : "") +
                ". Provide helpful advice, tips, or insights based on this cycle.";

        return service.getAdvice(prompt);
    }


    @PostMapping("/diet")
    public String getDiet(@RequestBody Map<String, String> request) {

        String query = request.get("query");
        if (query == null || query.trim().isEmpty()) {
            return "Query cannot be empty!";
        }
        return service.getDiet(query);
    }





}

