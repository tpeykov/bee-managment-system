package com.dev.bee_manegement_system.member;

import lombok.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor

public class Member {
    private Long id;
    private String name;
    private String email;
    private Type type;
}
