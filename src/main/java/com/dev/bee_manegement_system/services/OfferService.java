package com.dev.bee_manegement_system.services;

import com.dev.bee_manegement_system.controlles.dtoes.OfferValidationDTO;
import com.dev.bee_manegement_system.domain.entities.Offer;
import com.dev.bee_manegement_system.domain.entities.Poster;
import com.dev.bee_manegement_system.repositories.OfferRepository;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

@Service
public class OfferService {
    private final AuthService authService;
    private final OfferRepository offerRepository;
    private final PosterService posterService;

    public OfferService(AuthService authService, OfferRepository offerRepository, PosterService posterService) {
        this.authService = authService;
        this.offerRepository = offerRepository;
        this.posterService = posterService;
    }

    public void createOffer(OfferValidationDTO validation) throws ParseException {
        Poster poster = posterService.getByUuid(validation.getPosterUuid());

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Offer offer = new Offer();
        offer.setAuthor(authService.getAuthenticatedUser());
        offer.setDescription(validation.getDescription());
        offer.setPrice(validation.getPrice());
        offer.setValidTo(dateFormat.parse(validation.getValidTo()));
        offer.setVerifyDocument(validation.getVerifyDocument());
        offer.setCreatedDate(Instant.now());
        offerRepository.save(offer);

        poster.getOffers().add(offer);
        posterService.save(poster);
    }
}
