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
    private final String aiUrl = "http://localhost:11434/api/generate";

    public String getNutritionAdvice(String query) {
        try {
            // Ollama server
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

            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama3.2:1b");
            body.put("prompt", prompt);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            // Call Ollama API
            String rawResponse = restTemplate.postForObject(aiUrl, entity, String.class);


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
            // Ollama server
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


    public String getRoutine(Map<String, Object> fitnessData) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Extract user inputs
            String weight = fitnessData.get("weight").toString();
            String height = fitnessData.get("height").toString();
            String goal = fitnessData.get("goal").toString();
            String intensity = fitnessData.get("intensity").toString();

            // 🧠 Improved AI prompt
            String prompt = String.format(
                    "You are a certified personal trainer. Generate a structured weekly fitness routine for a female with:\n" +
                            "- Weight: %s kg\n" +
                            "- Height: %s cm\n" +
                            "- Goal: %s\n" +
                            "- Intensity: %s\n\n" +
                            "Format the routine using Markdown clearly for a web app:\n" +
                            "1. Each day of the week (Monday, Tuesday,Wednesday, Thursday, Friday, Saturday etc.) must be a subheading (Day Name) in Bold words.\n" +
                            "2. Include sections for Warm-up, Exercises, Cool-down, and Tips if applicable.\n" +
                            "3. Use bullet points  for each exercise step.\n" +
                            "4. Use bold headings that can be rendered by ReactMarkdown for exercise names and key instructions.\n" +
                            "5. Ensure proper spacing and line breaks so ReactMarkdown renders correctly.\n" +
                            "6. Do not insert extra symbols, hashtags, or markdown errors.\n" +
                            "7. The output should be ready to display as is in ReactMarkdown.\n\n" +
                            "Return only the Markdown text.",
                    weight, height, goal, intensity
            );

            // Prepare request body
            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama3.2:1b");
            body.put("prompt", prompt);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            // Send request
            String rawResponse = restTemplate.postForObject(aiUrl, entity, String.class);

            // Clean streaming JSON lines
            StringBuilder finalAnswer = new StringBuilder();
            ObjectMapper mapper = new ObjectMapper();

            for (String line : rawResponse.split("\n")) {
                if (!line.trim().isEmpty() && line.contains("\"response\"")) {
                    JsonNode node = mapper.readTree(line);
                    finalAnswer.append(node.get("response").asText());
                }
            }

            // Return ready-to-display Markdown
            return finalAnswer.toString()
                    .replaceAll("\\\\n", "\n")  // convert literal \n to actual newlines
                    .replaceAll("\\s{2,}", " ") // remove multiple spaces
                    .trim();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating fitness routine. Please try again later.";
        }
    }

    public String getSkinCareAdvice(String query) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            String prompt = "You are GlowGuide AI, a friendly and knowledgeable skincare advisor. " +
                    "Provide clear, dermatologist-inspired skincare advice for this question: \"" + query + "\".\n\n" +
                    "Guidelines:\n" +
                    "1. Give tips for healthy, glowing skin using safe and practical steps.\n" +
                    "2. Recommend skincare routines or ingredients (like hyaluronic acid, niacinamide, SPF, aloe vera, etc.) relevant to the user’s concern.\n" +
                    "3. Do NOT prescribe medicines or medical treatments.\n" +
                    "4. Keep your response conversational, short (2–4 sentences), and positive.\n" +
                    "5. Use simple language and an empathetic tone.\n" +
                    "6. Add one emoji related to beauty or self-care if suitable (🌸✨💧).";

            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama3.2:1b");
            body.put("prompt", prompt);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            // Call Ollama API
            String rawResponse = restTemplate.postForObject(aiUrl, entity, String.class);

            // Clean streaming JSON lines
            StringBuilder finalAnswer = new StringBuilder();
            ObjectMapper mapper = new ObjectMapper();
            for (String line : rawResponse.split("\n")) {
                if (!line.trim().isEmpty()) {
                    JsonNode node = mapper.readTree(line);
                    finalAnswer.append(node.get("response").asText());
                }
            }

            return finalAnswer.toString().trim();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating skincare advice. Please try again later.";
        }
    }
}

