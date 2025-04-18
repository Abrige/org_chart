package it.telematica.org_chart.dto;

// risposta del server per l'autenticazione, manda il token jwt al client dopo essere stato autenticato con successo
public class AuthResponse {

    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
