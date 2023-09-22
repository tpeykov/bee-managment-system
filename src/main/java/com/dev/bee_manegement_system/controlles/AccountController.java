package com.dev.bee_manegement_system.controlles;

import com.dev.bee_manegement_system.controlles.dtoes.ProfileInformationDTO;
import com.dev.bee_manegement_system.controlles.validations.RegisterUserValidation;
import com.dev.bee_manegement_system.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dev.bee_manegement_system.domain.entities.User;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AccountController {

    private final UserService userService;
    private final RestTemplate restTemplate;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@RequestBody @Valid RegisterUserValidation validationRegisterUser) throws Exception {
        String URL = "https://portal.registryagency.bg/CR/api/Deeds/Summary?page=1&pageSize=25&count=1&ident=" + validationRegisterUser.getUic() + "&selectedSearchFilter=1&includeHistory=false";
        boolean isValid = this.isUicValid(null, URL);

        if(!isValid) throw new Exception("UIC is invalid!");
        User user = this.userService.registerUser(validationRegisterUser, validationRegisterUser.getPassword());
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileInformationDTO> getProfileInformation() {
        return ResponseEntity.ok(userService.getInformation());
    }

    private boolean isUicValid(HttpEntity<Object> requestEntity, String url) {
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        return response.getBody() != null;
    }
}