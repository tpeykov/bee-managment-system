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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class PosterController {

    private final PosterService posterService;

    @Secured({ Authorities.USER })
    @PostMapping("/poster")
    public ResponseEntity createPoster(@RequestBody @Valid CreatePosterValidation validation) {
        this.posterService.createPoster(validation);

        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }


    @GetMapping("/posters")
    public ResponseEntity<List<PublicPosterDTO>> getAllPosters() {
        List<PublicPosterDTO> results = this.posterService.getAll();
        return ResponseEntity.status(HttpStatus.CREATED).body(results);
    }

    @GetMapping("/posters/{uuid}")
    public ResponseEntity<Poster> getPoster(@PathVariable String uuid) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.posterService.getPoster(uuid));
    }


}
