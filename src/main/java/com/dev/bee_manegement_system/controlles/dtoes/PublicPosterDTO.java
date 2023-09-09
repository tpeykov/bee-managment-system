package com.dev.bee_manegement_system.controlles.dtoes;

import com.dev.bee_manegement_system.domain.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter @Setter
public class PublicPosterDTO implements Serializable {

    private String uuid;

    private String description;

    private BigDecimal price;

    private User author;

    private String title;
}
