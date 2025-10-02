package com.aginas.SERVER_WHAMP.controller;


import com.aginas.SERVER_WHAMP.models.Forum;
import com.aginas.SERVER_WHAMP.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/api/")
public class MainController {

    @Autowired
    MainService service;

    @PostMapping("/forum")
    public ResponseEntity<Forum> forumContent(
            @RequestParam String emailId,
            @RequestParam String name,
            @RequestParam String address,
            @RequestParam Long phoneNo,
            @RequestParam String content
    ) {
        Forum forum = new Forum();
        forum.setEmailId(emailId);
        forum.setName(name);
        forum.setAddress(address);
        forum.setPhoneNo(phoneNo);
        forum.setContent(content);


        return service.addForum(forum);



    }


}
