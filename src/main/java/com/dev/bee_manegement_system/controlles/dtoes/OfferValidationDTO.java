package com.dev.bee_manegement_system.controlles.dtoes;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Setter
public class OfferValidationDTO {
    @NotNull
    private String posterUuid;

    @NotNull
    @Positive
    private Long price;

    private Integer amount;

    @NotNull
    private String description;
//
//    @NotNull
//    private String validTo;
}
