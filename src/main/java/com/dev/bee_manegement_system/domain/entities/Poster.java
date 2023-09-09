package com.dev.bee_manegement_system.domain.entities;

import com.dev.bee_manegement_system.domain.enums.PosterStatus;
import com.dev.bee_manegement_system.domain.enums.PosterType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Getter
@Setter
@Table(name = "posters")
public class Poster extends AbstractAuditingEntity implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid-poster")
    @GenericGenerator(name = "uuid-poster",
            strategy = "org.hibernate.id.UUIDGenerator")
    private String uuid;

    @Enumerated(EnumType.STRING)
    private PosterType type;

    @Enumerated(EnumType.STRING)
    private PosterStatus status;

    private String description;

    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "author_uuid", referencedColumnName = "uuid")
    private User author;

    private String title;

    private Instant validTo;
    // TODO add region entity
}