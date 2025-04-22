package it.telematica.org_chart.service;

import it.telematica.org_chart.model.Account;
import it.telematica.org_chart.model.Role;
import it.telematica.org_chart.repository.AccountRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private AccountRepository accountRepository; // anche se dice che lo vuole final, durante run time da errore se final

    public CustomUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        Account account = accountRepository.findByMail(mail).orElseThrow(() -> new UsernameNotFoundException("User with" + mail + " not found"));
        return new org.springframework.security.core.userdetails.User(account.getMail(), account.getPassword(), account.getAuthorities());
    }

    // ritorno il ruolo dell'account dalla sua mail
    public Role loadRoleByUsername(String mail) {
        Account account = accountRepository.findByMail(mail).orElseThrow(() -> new UsernameNotFoundException("User with" + mail + " not found"));
        return account.getRole();
    }

    // ritorna l'id dell'account dalla sua mail
    public Integer loadIdByUsername(String mail) {
        Account account =accountRepository.findByMail(mail).orElseThrow(() -> new UsernameNotFoundException("User " +
                "with" + mail + " not found"));
        return account.getId();
    }
}
