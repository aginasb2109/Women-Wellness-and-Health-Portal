package com.aginas.SERVER_WHAMP.repository;

import com.aginas.SERVER_WHAMP.models.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumDb extends JpaRepository<Forum, Long> {

}
