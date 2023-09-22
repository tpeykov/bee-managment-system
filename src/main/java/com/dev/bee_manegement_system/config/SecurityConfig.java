package com.dev.bee_manegement_system.config;

import com.dev.bee_manegement_system.domain.constants.Authorities;
import com.dev.bee_manegement_system.security.CustomAuthenticationFilter;
import com.dev.bee_manegement_system.security.JWTConfigurer;
import com.dev.bee_manegement_system.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
    private final TokenProvider tokenProvider;
    private final CorsFilter corsFilter;
    private final GlobalProperties globalProperties;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf()
                .disable()
                .addFilterBefore(corsFilter, CustomAuthenticationFilter.class)
//                .addFilter(new CustomAuthenticationFilter())
                .exceptionHandling()
                .and()
                .headers()
                .contentSecurityPolicy(globalProperties.getSecurity().getContentSecurityPolicy())
                .and()
                .frameOptions()
                .deny()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(STATELESS)
                .and()
                .authorizeHttpRequests((request) -> {
                    request.requestMatchers("/api/authenticate", "/api/register").permitAll();
                    request.requestMatchers("/api/account/change-password").hasAuthority("USER_ROLE");
//                    request.requestMatchers("/api/poster").hasAuthority("ROLE_MANUFACTURER");
                    request.anyRequest().permitAll();
                })
                .httpBasic()
                .and()
                .apply(securityConfigurerAdapter());

        return http.build();
    }

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().dispatcherTypeMatchers("/images/**", "/js/**", "/webjars/**");
//    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }
}

