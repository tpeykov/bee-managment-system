package com.dev.bee_manegement_system.controlles.dtoes;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

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

    private MultipartFile document;
}
