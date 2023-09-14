package com.dev.bee_manegement_system.controlles.dtoes;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class PublicOfferDTO {
    private Long price;

    private String description;

    private String verifyDocument;

    private Instant validTo;
}
