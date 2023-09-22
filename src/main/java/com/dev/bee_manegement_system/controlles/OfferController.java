package com.dev.bee_manegement_system.controlles;

import com.dev.bee_manegement_system.controlles.dtoes.OfferValidationDTO;
import com.dev.bee_manegement_system.domain.entities.Offer;
import com.dev.bee_manegement_system.services.OfferService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class OfferController {
    private final OfferService offerService;

    @PostMapping(value = "/offers", consumes = MediaType.ALL_VALUE)
    public ResponseEntity<Offer> createOffer(@ModelAttribute OfferValidationDTO validation) throws ParseException {
        Offer offer = offerService.createOffer(validation);
        return ResponseEntity.status(HttpStatus.CREATED).body(offer);
    }

    @PutMapping("/offers/{uuid}")
    public ResponseEntity<Offer> changeStatus(@PathVariable String uuid,
                             @RequestParam String status){

        Offer offer = offerService.changeStatus(uuid, status);
        return ResponseEntity.status(offer != null ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST).body(offer);
    }
}
