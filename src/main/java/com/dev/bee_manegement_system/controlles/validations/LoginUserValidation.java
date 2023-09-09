package com.dev.bee_manegement_system.controlles.validations;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUserValidation {
    @NotNull
    @Size(min = 3, max = 50)
    private String uic;

    @NotNull
    @Size(min = 4, max = 50)
    private String password;

    private boolean remember;
}
