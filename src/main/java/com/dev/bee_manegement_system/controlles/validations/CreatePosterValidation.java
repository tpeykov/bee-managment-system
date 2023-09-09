package com.dev.bee_manegement_system.controlles.validations;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Setter @Getter
public class CreatePosterValidation {
    @NotBlank
    @JsonProperty("title")
    private String title;

    @NotBlank @Length(min = 15, max = 450, message = "Description should be between 15 and 450 characters long")
    @JsonProperty("description")
    private String description;

    @NotBlank
    @JsonProperty("price")
    private BigDecimal price;

    private String date;
}
