package com.dev.bee_manegement_system.controlles.validations;

import com.dev.bee_manegement_system.domain.constants.Authorities;
import com.dev.bee_manegement_system.domain.constants.Constants;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter @Setter
public class RegisterUserValidation {
    @NotBlank
    @Pattern(regexp = Constants.USERNAME_REGEX)
    @Size(min = Constants.USERNAME_MIN_SIZE, max = Constants.USERNAME_MAX_SIZE)
    private String username;

    @NotBlank
    @Size(min = Constants.UIC_MIN_SIZE, max = Constants.UIC_MAX_SIZE)
    private String uic;

    @Email
    @Size(min = 5, max = 254)
    private String email;

    @Size(min = Constants.PASSWORD_MIN_LENGTH, max = Constants.PASSWORD_MAX_LENGTH)
    private String password;

    private String role;
}
