package it.telematica.org_chart.dto;

// tiene i dati delle credenziali dell'utente che deve poi verificare con i dati nel database
// questa classe è l'utente a popolarla compilando i dati del form
public class AuthRequest {
    private String mail;
    private String password;

    public AuthRequest() {
    }

    public AuthRequest(String mail, String password) {
        this.mail = mail;
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
