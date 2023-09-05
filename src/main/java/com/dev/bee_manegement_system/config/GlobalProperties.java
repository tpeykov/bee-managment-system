package com.dev.bee_manegement_system.config;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
@ConfigurationProperties(prefix = "bees")
public class GlobalProperties {
    private final Mail mail = new Mail();
    private final Security security = new Security();
    private final CorsConfiguration cors = new CorsConfiguration();
    private final Sms sms = new Sms();

    public Mail getMail() {
        return mail;
    }
    public Sms getSms(){
        return sms;
    }
    public Security getSecurity() { return security; }
    public CorsConfiguration getCors() { return cors; }

    @Getter
    @Setter
    public static class Mail {
        private String from;
        private String baseUrl;
    }
    @Getter @Setter
    public static class Sms {
        private String accountSID;
        private String authToken;
        private String serviceSID;
    }

    public static class Security {

        private String contentSecurityPolicy = DefaultGlobalProperties.Security.contentSecurityPolicy;

        private final ClientAuthorization clientAuthorization = new ClientAuthorization();

        private final Authentication authentication = new Authentication();

        private final RememberMe rememberMe = new RememberMe();

        private final OAuth2 oauth2 = new OAuth2();

        public ClientAuthorization getClientAuthorization() {
            return clientAuthorization;
        }

        public Authentication getAuthentication() {
            return authentication;
        }

        public RememberMe getRememberMe() {
            return rememberMe;
        }

        public OAuth2 getOauth2() {
            return oauth2;
        }

        public String getContentSecurityPolicy() {
            return contentSecurityPolicy;
        }

        public void setContentSecurityPolicy(String contentSecurityPolicy) {
            this.contentSecurityPolicy = contentSecurityPolicy;
        }

        public static class ClientAuthorization {

            private String accessTokenUri = DefaultGlobalProperties.Security.ClientAuthorization.accessTokenUri;

            private String tokenServiceId = DefaultGlobalProperties.Security.ClientAuthorization.tokenServiceId;

            private String clientId = DefaultGlobalProperties.Security.ClientAuthorization.clientId;

            private String clientSecret = DefaultGlobalProperties.Security.ClientAuthorization.clientSecret;

            public String getAccessTokenUri() {
                return accessTokenUri;
            }

            public void setAccessTokenUri(String accessTokenUri) {
                this.accessTokenUri = accessTokenUri;
            }

            public String getTokenServiceId() {
                return tokenServiceId;
            }

            public void setTokenServiceId(String tokenServiceId) {
                this.tokenServiceId = tokenServiceId;
            }

            public String getClientId() {
                return clientId;
            }

            public void setClientId(String clientId) {
                this.clientId = clientId;
            }

            public String getClientSecret() {
                return clientSecret;
            }

            public void setClientSecret(String clientSecret) {
                this.clientSecret = clientSecret;
            }
        }

        public static class Authentication {

            private final Jwt jwt = new Jwt();

            public Jwt getJwt() {
                return jwt;
            }

            public static class Jwt {

                private String secret = DefaultGlobalProperties.Security.Authentication.Jwt.secret;

                private String base64Secret = DefaultGlobalProperties.Security.Authentication.Jwt.base64Secret;

                private long tokenValidityInSeconds = DefaultGlobalProperties.Security.Authentication.Jwt
                        .tokenValidityInSeconds;

                private long tokenValidityInSecondsForRememberMe = DefaultGlobalProperties.Security.Authentication.Jwt
                        .tokenValidityInSecondsForRememberMe;

                public String getSecret() {
                    return secret;
                }

                public void setSecret(String secret) {
                    this.secret = secret;
                }

                public String getBase64Secret() {
                    return base64Secret;
                }

                public void setBase64Secret(String base64Secret) {
                    this.base64Secret = base64Secret;
                }

                public long getTokenValidityInSeconds() {
                    return tokenValidityInSeconds;
                }

                public void setTokenValidityInSeconds(long tokenValidityInSeconds) {
                    this.tokenValidityInSeconds = tokenValidityInSeconds;
                }

                public long getTokenValidityInSecondsForRememberMe() {
                    return tokenValidityInSecondsForRememberMe;
                }

                public void setTokenValidityInSecondsForRememberMe(long tokenValidityInSecondsForRememberMe) {
                    this.tokenValidityInSecondsForRememberMe = tokenValidityInSecondsForRememberMe;
                }
            }
        }

        public static class RememberMe {

            @NotNull
            private String key = DefaultGlobalProperties.Security.RememberMe.key;

            public String getKey() {
                return key;
            }

            public void setKey(String key) {
                this.key = key;
            }
        }

        public static class OAuth2 {
            private List<String> audience = new ArrayList<>();

            public List<String> getAudience() {
                return Collections.unmodifiableList(audience);
            }

            public void setAudience(@NotNull List<String> audience) {
                this.audience.addAll(audience);
            }
        }
    }

}