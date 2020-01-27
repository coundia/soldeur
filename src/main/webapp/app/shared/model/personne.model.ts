import { IUser } from 'app/core/user/user.model';
import { ICompte } from 'app/shared/model/compte.model';

export interface IPersonne {
  id?: number;
  code?: string;
  prenom?: string;
  nom?: string;
  telephone?: string;
  active?: boolean;
  assignedTo?: IUser;
  comptes?: ICompte[];
}

export class Personne implements IPersonne {
  constructor(
    public id?: number,
    public code?: string,
    public prenom?: string,
    public nom?: string,
    public telephone?: string,
    public active?: boolean,
    public assignedTo?: IUser,
    public comptes?: ICompte[]
  ) {
    this.active = this.active || false;
  }
}
