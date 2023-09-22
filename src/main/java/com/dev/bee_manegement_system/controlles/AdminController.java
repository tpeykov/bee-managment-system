package com.dev.bee_manegement_system.controlles;

import com.dev.bee_manegement_system.domain.entities.Poster;
import com.dev.bee_manegement_system.domain.entities.User;
import com.dev.bee_manegement_system.services.PosterService;
import com.dev.bee_manegement_system.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
    private final UserService userService;
    private final PosterService posterService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAdminUsers() {
        List<User> users = this.userService.getAdminUsers();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping("/posters")
    public ResponseEntity<List<Poster>> getAdminPosters() {
        List<Poster> posters = this.posterService.getAdminPosters();
        return ResponseEntity.status(HttpStatus.OK).body(posters);
    }
}