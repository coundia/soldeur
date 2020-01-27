package com.soldeur.app.repository;

import com.soldeur.app.domain.Personne;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Personne entity.
 */
@Repository
public interface PersonneRepository extends JpaRepository<Personne, Long> {

    @Query("select personne from Personne personne where personne.assignedTo.login = ?#{principal.username}")
    List<Personne> findByAssignedToIsCurrentUser();

    @Query(value = "select distinct personne from Personne personne left join fetch personne.comptes",
        countQuery = "select count(distinct personne) from Personne personne")
    Page<Personne> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct personne from Personne personne left join fetch personne.comptes")
    List<Personne> findAllWithEagerRelationships();

    @Query("select personne from Personne personne left join fetch personne.comptes where personne.id =:id")
    Optional<Personne> findOneWithEagerRelationships(@Param("id") Long id);

}
