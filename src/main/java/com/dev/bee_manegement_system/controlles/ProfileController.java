package com.dev.bee_manegement_system.controlles;

import com.dev.bee_manegement_system.domain.entities.Offer;
import com.dev.bee_manegement_system.domain.entities.Poster;
import com.dev.bee_manegement_system.services.OfferService;
import com.dev.bee_manegement_system.services.PosterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@Slf4j
public class ProfileController {
    private final OfferService offerService;
    private final PosterService posterService;

    @GetMapping("/offers")
    public ResponseEntity<List<Offer>> getOwnedOffers() {
        List<Offer> offers = offerService.getOwnedOffers();
        return ResponseEntity.status(HttpStatus.OK).body(offers);
    }

    @GetMapping("/posters")
    public ResponseEntity<List<Poster>> getOwnedPosters() {
        List<Poster> offers = this.posterService.getOwnedPosters();
        return ResponseEntity.status(HttpStatus.OK).body(offers);
    }
}