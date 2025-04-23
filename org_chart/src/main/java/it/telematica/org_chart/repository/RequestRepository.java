package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Company;
import it.telematica.org_chart.model.Request;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends CrudRepository<Request, Integer> {

    /*
    SELECT r.*
    FROM v_requests r
    WHERE
        (:account_role_fk = 3)
       OR
        (
            :account_role_fk = 2
                AND r.company_id IN (
                SELECT ac.company_fk
                FROM accounts_companies ac
                WHERE ac.account_fk = :account_id
                  AND ac.is_admin = 1
            )
        );
     */
    @Query( value = "SELECT r.* " +
            "FROM v_requests r " +
            "WHERE " +
            "(:account_role_fk = 3) " +
            "OR " +
            "( " +
            ":account_role_fk = 2 " +
            "AND r.company_id IN ( " +
            "SELECT ac.company_fk " +
            "FROM accounts_companies ac " +
            "WHERE ac.account_fk = :account_id " +
            "AND ac.is_admin = 1 " +
            ") " +
            ") "
            , nativeQuery = true) // nativeQuery --> perchè non è una query JPQL e quindi non usa i model fatti da noi
    // ma direttamente le tabelle del database
    List<Request> findRequestsByAccountAndRole(@Param("account_role_fk") Integer accountRoleFk,
                                            @Param("account_id") Integer accountId);
}
