package com.dev.bee_manegement_system.services;

import com.dev.bee_manegement_system.controlles.dtoes.PublicPosterDTO;
import com.dev.bee_manegement_system.controlles.validations.CreatePosterValidation;
import com.dev.bee_manegement_system.domain.entities.Poster;
import com.dev.bee_manegement_system.domain.enums.PosterStatus;
import com.dev.bee_manegement_system.repositories.PosterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PosterService {

    private final PosterRepository posterRepository;
    private final AuthService authService;
    private final ModelMapper modelMapper;

    public void createPoster(CreatePosterValidation validation) {
        Poster poster = new Poster();
        poster.setDescription(validation.getDescription());
        poster.setTitle(validation.getTitle());
        poster.setPrice(validation.getPrice());
        poster.setAuthor(authService.getAuthenticatedUser());
        poster.setStatus(PosterStatus.ACTIVE);

        this.posterRepository.save(poster);
    }

    public List<PublicPosterDTO> getAll() {
        return this.posterRepository.getPosterByStatus(PosterStatus.ACTIVE)
                                    .stream().map(poster -> this.modelMapper.map(poster, PublicPosterDTO.class)).toList();
    }
}
