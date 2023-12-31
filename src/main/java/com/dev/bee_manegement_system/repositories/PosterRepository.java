package com.dev.bee_manegement_system.repositories;

import com.dev.bee_manegement_system.domain.entities.Poster;
import com.dev.bee_manegement_system.domain.enums.PosterStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PosterRepository extends JpaRepository<Poster, String> {
    List<Poster> getPosterByStatus(PosterStatus status);

    Optional<Poster> findByUuid(String posterUuid);

    List<Poster> getAllByAuthorUuid(String uuid);
}