package it.telematica.org_chart.repository;

import it.telematica.org_chart.model.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    // trova il ruolo in base al suo nome, se non lo trova ritorna null
    Role findByName(String name);
}
