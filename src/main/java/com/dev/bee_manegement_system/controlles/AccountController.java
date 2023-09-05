package com.dev.bee_manegement_system.controlles;

import com.dev.bee_manegement_system.controlles.validations.RegisterUserValidation;
import com.dev.bee_manegement_system.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.dev.bee_manegement_system.domain.entities.User;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AccountController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@RequestBody @Valid RegisterUserValidation validationRegisterUser) {
        User user = this.userService.registerUser(validationRegisterUser, validationRegisterUser.getPassword());

        log.info("{}", user);
    }
}