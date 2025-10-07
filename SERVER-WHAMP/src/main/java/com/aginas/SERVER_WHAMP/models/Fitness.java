package com.aginas.SERVER_WHAMP.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fitness {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Integer weight;
    @Column(nullable = false)
    private Integer height;
    @Column(nullable = false)
    private String goal;
    @Column(nullable = false)
    private String intensity;
}
