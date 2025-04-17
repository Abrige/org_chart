package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Account;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends CrudRepository<Account, Integer> {
    // ritorna tutti gli account in base all'username
    Optional<Account> findByMail(String mail);
}
