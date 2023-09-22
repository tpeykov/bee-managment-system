package com.dev.bee_manegement_system.services;

import com.dev.bee_manegement_system.controlles.dtoes.PublicPosterDTO;
import com.dev.bee_manegement_system.controlles.validations.CreatePosterValidation;
import com.dev.bee_manegement_system.domain.entities.Picture;
import com.dev.bee_manegement_system.domain.entities.Offer;
import com.dev.bee_manegement_system.domain.entities.Poster;
import com.dev.bee_manegement_system.domain.entities.User;
import com.dev.bee_manegement_system.domain.enums.PosterStatus;
import com.dev.bee_manegement_system.repositories.PosterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PosterService {

    private final PosterRepository posterRepository;
    private final AuthService authService;
    private final ModelMapper modelMapper;
    private final ImageCloudService imageCloudService;

    public void createPoster(CreatePosterValidation validation) {
        Poster poster = new Poster();
        poster.setDescription(validation.getDescription());
        poster.setTitle(validation.getTitle());
        poster.setPrice(validation.getPrice());
        poster.setAuthor(authService.getAuthenticatedUser());
        poster.setStatus(PosterStatus.ACTIVE);


        for (MultipartFile image : validation.getImages()) {
            String pictureUrl = imageCloudService.saveImage(image);
            Picture picture = new Picture();
            picture.setPoster(poster);
            picture.setUrl(pictureUrl);
            picture.setTitle(image.getOriginalFilename());
            poster.getImages().add(picture);
            // TODO save image
        }

        this.posterRepository.save(poster);
    }

    public List<PublicPosterDTO> getAll() {
        return this.posterRepository.getPosterByStatus(PosterStatus.ACTIVE)
                                    .stream().map(poster -> this.modelMapper.map(poster, PublicPosterDTO.class)).toList();
    }

    public Poster getByUuid(String posterUuid) {
       return posterRepository.findByUuid(posterUuid).orElseThrow();
    }

    public void save(Poster poster) {
        posterRepository.save(poster);
    }

    public Poster getPoster(String uuid) {
        return posterRepository.findByUuid(uuid).orElse(null);
    }

    public List<Poster> getOwnedPosters() {
        User user = this.authService.getAuthenticatedUser();
        return this.posterRepository.getAllByAuthorUuid(user.getUuid());
    }

    public List<Poster> getAdminPosters() {
        return this.posterRepository.findAll();
    }
}
