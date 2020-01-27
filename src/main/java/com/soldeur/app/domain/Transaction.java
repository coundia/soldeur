package com.soldeur.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Transaction.
 */
@Entity
@Table(name = "transaction")
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "montant")
    private Integer montant;

    @Column(name = "solde_apres")
    private Integer soldeApres;

    @Column(name = "solde_avant")
    private Integer soldeAvant;

    @Column(name = "date_operation")
    private LocalDate dateOperation;

    @Column(name = "etat")
    private Boolean etat;

    @ManyToOne
    @JsonIgnoreProperties("transactions")
    private Personne personne;

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

    public Transaction code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getMontant() {
        return montant;
    }

    public Transaction montant(Integer montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(Integer montant) {
        this.montant = montant;
    }

    public Integer getSoldeApres() {
        return soldeApres;
    }

    public Transaction soldeApres(Integer soldeApres) {
        this.soldeApres = soldeApres;
        return this;
    }

    public void setSoldeApres(Integer soldeApres) {
        this.soldeApres = soldeApres;
    }

    public Integer getSoldeAvant() {
        return soldeAvant;
    }

    public Transaction soldeAvant(Integer soldeAvant) {
        this.soldeAvant = soldeAvant;
        return this;
    }

    public void setSoldeAvant(Integer soldeAvant) {
        this.soldeAvant = soldeAvant;
    }

    public LocalDate getDateOperation() {
        return dateOperation;
    }

    public Transaction dateOperation(LocalDate dateOperation) {
        this.dateOperation = dateOperation;
        return this;
    }

    public void setDateOperation(LocalDate dateOperation) {
        this.dateOperation = dateOperation;
    }

    public Boolean isEtat() {
        return etat;
    }

    public Transaction etat(Boolean etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public Personne getPersonne() {
        return personne;
    }

    public Transaction personne(Personne personne) {
        this.personne = personne;
        return this;
    }

    public void setPersonne(Personne personne) {
        this.personne = personne;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaction)) {
            return false;
        }
        return id != null && id.equals(((Transaction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", montant=" + getMontant() +
            ", soldeApres=" + getSoldeApres() +
            ", soldeAvant=" + getSoldeAvant() +
            ", dateOperation='" + getDateOperation() + "'" +
            ", etat='" + isEtat() + "'" +
            "}";
    }
}
