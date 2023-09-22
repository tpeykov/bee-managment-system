package com.dev.bee_manegement_system.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "pictures")
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uuid;

    @Column
    private String title;

    @Column(nullable = false)
    private String url;

    @JsonIgnore
    @ManyToOne
    private Poster poster;
}
