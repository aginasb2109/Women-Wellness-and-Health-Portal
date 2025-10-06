package com.aginas.SERVER_WHAMP.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
@Service
public class AiService {

    public String getNutritionAdvice(String query) {
        try {
            String aiUrl = "http://localhost:11434/api/generate"; // Ollama server
            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama3.2:1b");
            body.put("prompt", "You are a nutrition well-wisher. Provide helpful advice for: " + query);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            // Call Ollama API
            String rawResponse = restTemplate.postForObject(aiUrl, entity, String.class);

            // Split by newlines (Ollama returns streaming JSON chunks)
            StringBuilder finalAnswer = new StringBuilder();
            ObjectMapper mapper = new ObjectMapper();
            for (String line : rawResponse.split("\n")) {
                if (!line.trim().isEmpty()) {
                    JsonNode node = mapper.readTree(line);
                    finalAnswer.append(node.get("response").asText());
                }
            }

            return finalAnswer.toString(); // <-- just the answer as string

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating answer";
        }
    }

    public String getAdvice(String prompt) {
        try {
            String aiUrl = "http://localhost:11434/api/generate"; // Ollama server
            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama3.2:1b");
            body.put("prompt", prompt);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            // Call Ollama API
            String rawResponse = restTemplate.postForObject(aiUrl, entity, String.class);

            // Parse streaming JSON chunks
            StringBuilder finalAnswer = new StringBuilder();
            ObjectMapper mapper = new ObjectMapper();
            for (String line : rawResponse.split("\n")) {
                if (!line.trim().isEmpty()) {
                    JsonNode node = mapper.readTree(line);
                    finalAnswer.append(node.get("response").asText());
                }
            }

            return finalAnswer.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating advice";
        }
    }


    public String getDiet(String query) {
        try {
            String aiUrl = "http://localhost:11434/api/generate"; // Ollama server
            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama3.2:1b");
            body.put("prompt", "You are a friendly nutrition expert and wellness advisor. " +
                    "Create a detailed diet plan for: " + query + ". " +
                    "Include the following in plain text (not JSON):\n" +
                    "1. Title of the diet plan.\n" +
                    "2. Subtitle describing the goal or focus of the plan, make it bold using markdown like **this**.\n" +
                    "3. List the meals for Breakfast, Lunch, Dinner, and Snacks.\n" +
                    "4. For each meal, include description, portions, tips, and benefits.\n\n" +
                    "Format it nicely using markdown so it can be rendered directly in ReactMarkdown.\n" +
                    "Do NOT output JSON, only readable content text.");




            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            // Call Ollama API
            String rawResponse = restTemplate.postForObject(aiUrl, entity, String.class);

            // Split by newlines (Ollama returns streaming JSON chunks)
            StringBuilder finalAnswer = new StringBuilder();
            ObjectMapper mapper = new ObjectMapper();
            for (String line : rawResponse.split("\n")) {
                if (!line.trim().isEmpty()) {
                    JsonNode node = mapper.readTree(line);
                    finalAnswer.append(node.get("response").asText());
                }
            }

            return finalAnswer.toString(); // <-- just the answer as string

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating answer";
        }
    }
}

