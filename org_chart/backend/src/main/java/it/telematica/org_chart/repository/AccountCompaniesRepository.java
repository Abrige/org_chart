package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.AccountCompanies;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AccountCompaniesRepository extends CrudRepository<AccountCompanies, Integer> {

    @Query(value="SELECT id, account_id, account_mail, account_role, is_admin, company_id, company_name\n" +
            "FROM v_accounts_companies\n" +
            "WHERE account_id = ?1 AND is_admin = 'TRUE'",
            nativeQuery = true)
    List<AccountCompanies> findAdminsByAccountId(Integer accountId);


}

