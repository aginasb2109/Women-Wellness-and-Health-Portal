package com.aginas.SERVER_WHAMP.service;


import com.aginas.SERVER_WHAMP.models.Forum;
import com.aginas.SERVER_WHAMP.repository.ForumDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MainService {

    @Autowired
    ForumDb db;


    public ResponseEntity<Forum> addForum(Forum forum) {

        Forum savedForum = db.save(forum);

        return ResponseEntity.ok(savedForum);

    }
}
