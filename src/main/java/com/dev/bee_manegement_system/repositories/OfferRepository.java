package com.dev.bee_manegement_system.repositories;

import com.dev.bee_manegement_system.domain.entities.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, String> {}
