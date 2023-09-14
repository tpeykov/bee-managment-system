package com.dev.bee_manegement_system.controlles.dtoes;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OfferValidationDTO {
    private String posterUuid;
    private Long price;

    private String description;

    private String verifyDocument;

    private String validTo;
}
