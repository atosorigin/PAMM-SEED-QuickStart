package pamm.infrastructure.security.authentication;

import io.jsonwebtoken.Claims;

public class Principal {
    public enum Role {USER, ADMIN}

    private final String authToken;
    private final Claims claims;
    private final Token.Status tokenStatus;
    private final String subject;

    public Principal(String authToken, Token.Status tokenStatus, Claims claims) {
        this.authToken = authToken;
        this.tokenStatus = tokenStatus;
        this.claims = claims;
        this.subject = claims.getSubject();
    }

    public Principal(String authToken, Token.Status tokenStatus) {
        this.authToken = authToken;
        this.tokenStatus = tokenStatus;
        this.claims = null;
        this.subject = null;
    }

    public String getAuthToken() {
        return authToken;
    }

    public Claims getClaims() {
        return claims;
    }

    public Token.Status getTokenStatus() {
        return tokenStatus;
    }

    public String getSubject() {
        return subject;
    }
}

