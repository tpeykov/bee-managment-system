package com.dev.bee_manegement_system.repositories;

import com.dev.bee_manegement_system.domain.entities.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepository extends JpaRepository<Offer, String> {
    Optional<Offer> findByUuid(String uuid);
    List<Offer> findAllByAuthorUuid(String uuid);
}
