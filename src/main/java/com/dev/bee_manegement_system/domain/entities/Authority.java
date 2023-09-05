package com.dev.bee_manegement_system.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;

@Entity @Getter
public class Authority implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    private String name;
}
