package com.dev.bee_manegement_system.services;

import com.dev.bee_manegement_system.controlles.dtoes.OfferValidationDTO;
import com.dev.bee_manegement_system.domain.entities.Offer;
import com.dev.bee_manegement_system.domain.entities.Poster;
import com.dev.bee_manegement_system.domain.enums.OfferStatus;
import com.dev.bee_manegement_system.repositories.OfferRepository;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;

@Service
public class OfferService {
    private final AuthService authService;
    private final OfferRepository offerRepository;
    private final PosterService posterService;
    private final ImageCloudService imageCloudService;

    public OfferService(AuthService authService, OfferRepository offerRepository, PosterService posterService, ImageCloudService imageCloudService) {
        this.authService = authService;
        this.offerRepository = offerRepository;
        this.posterService = posterService;
        this.imageCloudService = imageCloudService;
    }

    public Offer createOffer(OfferValidationDTO validation) throws ParseException {
        Poster poster = posterService.getByUuid(validation.getPosterUuid());
        String documentUrl = imageCloudService.saveImage(validation.getDocument());

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Offer offer = new Offer();
        offer.setAuthor(authService.getAuthenticatedUser());
        offer.setDescription(validation.getDescription());
        offer.setPrice(validation.getPrice());
//        offer.setValidTo(dateFormat.parse(validation.getValidTo()));
        offer.setVerifyDocument(documentUrl);
        offer.setCreatedDate(Instant.now());
        offerRepository.save(offer);

        poster.getOffers().add(offer);
        posterService.save(poster);

        return offer;
    }

    public void changeStatus(String uuid, String status) {
        Offer offer = offerRepository.findByUuid(uuid).orElse(null);

        if (offer != null) {
            OfferStatus statusToSet = OfferStatus.valueOf(status);
            offer.setStatus
                    (statusToSet);
            offerRepository.save(offer);
        }
    }
}
