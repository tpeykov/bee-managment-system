package com.dev.bee_manegement_system.repositories;

import com.dev.bee_manegement_system.domain.entities.UserAuthority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthorityRepository extends JpaRepository<UserAuthority, Long> {
}
