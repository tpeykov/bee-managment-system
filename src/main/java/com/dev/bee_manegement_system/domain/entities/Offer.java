package com.dev.bee_manegement_system.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.time.Instant;


@Entity
@Getter
@Setter
@Table(name = "offers")
public class Offer extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid-poster")
    @GenericGenerator(name = "uuid-poster",
            strategy = "org.hibernate.id.UUIDGenerator")
    private String uuid;

    private Long price;

    private String description;

    private String verifyDocument;

    private Instant validTo;

    @ManyToOne
    @JoinColumn(name = "author_uuid", referencedColumnName = "uuid")
    private User author;
}
