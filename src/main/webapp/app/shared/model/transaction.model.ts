import { Moment } from 'moment';
import { IPersonne } from 'app/shared/model/personne.model';

export interface ITransaction {
  id?: number;
  code?: string;
  montant?: number;
  soldeApres?: number;
  soldeAvant?: number;
  dateOperation?: Moment;
  etat?: boolean;
  personne?: IPersonne;
}

export class Transaction implements ITransaction {
  constructor(
    public id?: number,
    public code?: string,
    public montant?: number,
    public soldeApres?: number,
    public soldeAvant?: number,
    public dateOperation?: Moment,
    public etat?: boolean,
    public personne?: IPersonne
  ) {
    this.etat = this.etat || false;
  }
}
