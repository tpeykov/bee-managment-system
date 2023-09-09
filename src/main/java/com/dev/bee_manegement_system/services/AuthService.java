package com.dev.bee_manegement_system.services;

import com.dev.bee_manegement_system.domain.entities.User;
import com.dev.bee_manegement_system.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service

@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    public User getAuthenticatedUser() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof UserDetails details) {
            return this.userRepository.findOneByUsername(details.getUsername()).orElse(null);
        }

        String login = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.userRepository.findOneByUsername(login)
                .orElseGet(() -> this.userRepository.findOneByEmailIgnoreCase(login).orElse(null));
    }
}
