package com.dev.bee_manegement_system.controlles;

import com.dev.bee_manegement_system.controlles.dtoes.OfferValidationDTO;
import com.dev.bee_manegement_system.services.OfferService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class OfferController {
    private final OfferService offerService;

    @PostMapping("/offers")
    public ResponseEntity createOffer(@RequestBody OfferValidationDTO validation) throws ParseException {
        offerService.createOffer(validation);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
}
