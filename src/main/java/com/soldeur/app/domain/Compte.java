package com.soldeur.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Compte.
 */
@Entity
@Table(name = "compte")
public class Compte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "solde")
    private Integer solde;

    @Column(name = "solde_avant")
    private Integer soldeAvant;

    @Column(name = "description")
    private String description;

    @Column(name = "date_update")
    private LocalDate dateUpdate;

    @Column(name = "active")
    private Boolean active;

    @ManyToMany(mappedBy = "comptes")
    @JsonIgnore
    private Set<Personne> personnes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Compte code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getSolde() {
        return solde;
    }

    public Compte solde(Integer solde) {
        this.solde = solde;
        return this;
    }

    public void setSolde(Integer solde) {
        this.solde = solde;
    }

    public Integer getSoldeAvant() {
        return soldeAvant;
    }

    public Compte soldeAvant(Integer soldeAvant) {
        this.soldeAvant = soldeAvant;
        return this;
    }

    public void setSoldeAvant(Integer soldeAvant) {
        this.soldeAvant = soldeAvant;
    }

    public String getDescription() {
        return description;
    }

    public Compte description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateUpdate() {
        return dateUpdate;
    }

    public Compte dateUpdate(LocalDate dateUpdate) {
        this.dateUpdate = dateUpdate;
        return this;
    }

    public void setDateUpdate(LocalDate dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    public Boolean isActive() {
        return active;
    }

    public Compte active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<Personne> getPersonnes() {
        return personnes;
    }

    public Compte personnes(Set<Personne> personnes) {
        this.personnes = personnes;
        return this;
    }

    public Compte addPersonne(Personne personne) {
        this.personnes.add(personne);
        personne.getComptes().add(this);
        return this;
    }

    public Compte removePersonne(Personne personne) {
        this.personnes.remove(personne);
        personne.getComptes().remove(this);
        return this;
    }

    public void setPersonnes(Set<Personne> personnes) {
        this.personnes = personnes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Compte)) {
            return false;
        }
        return id != null && id.equals(((Compte) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Compte{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", solde=" + getSolde() +
            ", soldeAvant=" + getSoldeAvant() +
            ", description='" + getDescription() + "'" +
            ", dateUpdate='" + getDateUpdate() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
