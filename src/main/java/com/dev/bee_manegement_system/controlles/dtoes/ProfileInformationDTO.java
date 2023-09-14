package com.dev.bee_manegement_system.controlles.dtoes;

import com.dev.bee_manegement_system.domain.entities.Poster;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProfileInformationDTO {
    private String username;
    private String uic;
    private String email;

    private String password;

    private String firstName;

    private String lastName;
    private List<PublicPosterDTO> posters;
    private List<PublicOfferDTO> offers;
}
