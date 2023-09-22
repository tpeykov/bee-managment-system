package com.dev.bee_manegement_system.controlles;

import com.dev.bee_manegement_system.controlles.dtoes.PublicPosterDTO;
import com.dev.bee_manegement_system.controlles.validations.CreatePosterValidation;
import com.dev.bee_manegement_system.domain.constants.Authorities;
import com.dev.bee_manegement_system.domain.entities.Poster;
import com.dev.bee_manegement_system.services.PosterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
@Slf4j
public class PosterController {

    private final PosterService posterService;

    @PostMapping("/poster")
//    @Secured("ROLE_MANUFACTURER")
    public ResponseEntity createPoster(@RequestBody @Valid CreatePosterValidation validation) {
        this.posterService.createPoster(validation);

        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @GetMapping("/posters")
    public ResponseEntity<List<PublicPosterDTO>> getAllPosters() {
        List<PublicPosterDTO> results = this.posterService.getAll();
        return ResponseEntity.status(HttpStatus.CREATED).body(results);
    }

//    @Secured(Authorities.MANUFACTURER)
    @GetMapping("/posters/{uuid}")
    public Poster getPoster(@PathVariable String uuid) {
        Poster poster = this.posterService.getPoster(uuid);
        return poster;
//        return ResponseEntity.ok(poster);
    }
}
