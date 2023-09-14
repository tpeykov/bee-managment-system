package com.dev.bee_manegement_system.services;

import com.dev.bee_manegement_system.controlles.dtoes.ProfileInformationDTO;
import com.dev.bee_manegement_system.controlles.dtoes.PublicOfferDTO;
import com.dev.bee_manegement_system.controlles.dtoes.PublicPosterDTO;
import com.dev.bee_manegement_system.controlles.errors.EmailAlreadyUsedException;
import com.dev.bee_manegement_system.controlles.errors.UsernameAlreadyUsedException;
import com.dev.bee_manegement_system.controlles.validations.RegisterUserValidation;
import com.dev.bee_manegement_system.domain.entities.User;
import com.dev.bee_manegement_system.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) {
        if (new EmailValidator().isValid(username, null)) {
            Optional<User> user = userRepository.findOneWithAuthoritiesByEmailIgnoreCase(username);

            if (user.isEmpty())
                throw new UsernameNotFoundException("User with email " + username + " was not found in the database");

            return createSpringSecurityUser(username, user.get());
        }

        final String lowercaseUsername = username.toLowerCase();
        Optional<User> user = userRepository.findOneWithAuthoritiesByUsername(lowercaseUsername);

        if (user.isEmpty())
            throw new UsernameNotFoundException("User with email " + username + " was not found in the database");

        return createSpringSecurityUser(lowercaseUsername, user.get());
    }

    public User registerUser(RegisterUserValidation user, String password) {
        this.userRepository
                .findOneByUsername(user.getUsername().toLowerCase())
                .ifPresent(existingUser -> {
                    throw new UsernameAlreadyUsedException();
                });

        this.userRepository
                .findOneByEmailIgnoreCase(user.getEmail())
                .ifPresent(existingUser -> {
                    throw new EmailAlreadyUsedException();
                });

        User newUser = new User();

        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setUsername(user.getUsername().toLowerCase());
        newUser.setPassword(encryptedPassword);
        newUser.setEmail(user.getEmail().toLowerCase());
        newUser.setUic(user.getUic());
        newUser.setActivated(true);

        userRepository.save(newUser);
        return newUser;
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String username, User user) {
        if (!user.isActivated()) {
            throw new Error("User " + username + " was not activated");
        }
        List<GrantedAuthority> grantedAuthorities = user
                .getAuthorities()
                .stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorities);
    }

    public ProfileInformationDTO getInformation() {
        User user = authService.getAuthenticatedUser();

        ProfileInformationDTO information = new ProfileInformationDTO();
        information.setUsername(user.getUsername());
        information.setFirstName(user.getFirstName());
        information.setLastName(user.getLastName());
        information.setPassword(user.getPassword());
        information.setEmail(user.getEmail());

        List<PublicPosterDTO> posters = user.getPosters()
                .stream()
                .map(poster -> modelMapper.map(poster, PublicPosterDTO.class))
                .collect(Collectors.toList());

        List<PublicOfferDTO> offers = user.getOffers()
                .stream()
                .map(offer -> modelMapper.map(offer, PublicOfferDTO.class))
                .collect(Collectors.toList());

        information.setPosters(posters);
        information.setOffers(offers);

        return information;
    }
}
