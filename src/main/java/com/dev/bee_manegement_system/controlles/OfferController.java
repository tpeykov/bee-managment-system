package com.dev.bee_manegement_system.controlles;

import com.dev.bee_manegement_system.controlles.dtoes.OfferValidationDTO;
import com.dev.bee_manegement_system.domain.entities.Offer;
import com.dev.bee_manegement_system.domain.enums.OfferStatus;
import com.dev.bee_manegement_system.services.OfferService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class OfferController {
    private final OfferService offerService;

    @PostMapping("/offers")
    public ResponseEntity<Offer> createOffer(@RequestBody OfferValidationDTO validation) throws ParseException {
        Offer offer = offerService.createOffer(validation);
        return ResponseEntity.status(HttpStatus.CREATED).body(offer);
    }
    @PutMapping("/offers/{uuid}")
    public void changeStatus(@PathVariable String uuid,
                             @RequestParam String status){
        offerService.changeStatus(uuid, status);

    }
}
