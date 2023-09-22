package com.dev.bee_manegement_system.domain.entities;

import com.dev.bee_manegement_system.domain.constants.Constants;
import com.dev.bee_manegement_system.domain.enums.UserType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "users")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class User extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid-user")
    @GenericGenerator(name = "uuid-user",
            strategy = "org.hibernate.id.UUIDGenerator")
    private String uuid;

    @Pattern(regexp = Constants.USERNAME_REGEX)
    @Size(min = 1, max = 50)
    @Column(length = 50, unique = true)
    private String username;

    @Size(min = 5, max = 30)
    @Column(length = 50, unique = true)
    private String uic;

    @Enumerated(EnumType.STRING)
    private UserType type;

    @Email
    @Size(min = 5, max = 254)
    @Column(length = 254, unique = true)
    private String email;

    @JsonIgnore
    @Column(name = "password_hash")
    private String password;

    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    private String lastName;

    @JsonIgnore
    @OneToMany(mappedBy = "author")
    private List<Poster> posters;

    @JsonIgnore
    @OneToMany(mappedBy = "author")
    private List<Offer> offers;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_uuid", referencedColumnName = "uuid")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")}
    )
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @BatchSize(size = 20)
    private Set<Authority> authorities = new HashSet<>();
}
