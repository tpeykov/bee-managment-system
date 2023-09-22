package com.dev.bee_manegement_system.domain.entities;

import com.dev.bee_manegement_system.domain.enums.PosterStatus;
import com.dev.bee_manegement_system.domain.enums.PosterType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "posters")
public class Poster extends AbstractAuditingEntity {
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

    @OneToMany
    private List<Offer> offers;


    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Picture> images = new ArrayList<>();

    @Override
    public String toString() {
        return "Poster{" +
                "uuid='" + uuid + '\'' +
                ", type=" + type +
                ", status=" + status +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", author=" + author +
                ", title='" + title + '\'' +
                ", validTo=" + validTo +
                ", offers=" + offers +
                '}';
    }
}
