import { Moment } from 'moment';
import { IPersonne } from 'app/shared/model/personne.model';

export interface ICompte {
  id?: number;
  code?: string;
  solde?: number;
  soldeAvant?: number;
  description?: string;
  dateUpdate?: Moment;
  active?: boolean;
  personnes?: IPersonne[];
}

export class Compte implements ICompte {
  constructor(
    public id?: number,
    public code?: string,
    public solde?: number,
    public soldeAvant?: number,
    public description?: string,
    public dateUpdate?: Moment,
    public active?: boolean,
    public personnes?: IPersonne[]
  ) {
    this.active = this.active || false;
  }
}
