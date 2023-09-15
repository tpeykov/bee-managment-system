package com.dev.bee_manegement_system.domain.entities;

import lombok.Getter;

import jakarta.persistence.*;

@Entity @Getter
@Table(name = "user_authority")
public class UserAuthority {

    public UserAuthority() {}

    public UserAuthority(String user_uuid, String authority_name) {
        this.user_uuid = user_uuid;
        this.authority_name = authority_name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userAuthorityGenerator")
    @SequenceGenerator(name = "userAuthorityGenerator", allocationSize = 1)
    private Long id;

    private String user_uuid;
    private String authority_name;
}
