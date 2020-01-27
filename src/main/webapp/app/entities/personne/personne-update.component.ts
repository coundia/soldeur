import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPersonne, Personne } from 'app/shared/model/personne.model';
import { PersonneService } from './personne.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ICompte } from 'app/shared/model/compte.model';
import { CompteService } from 'app/entities/compte/compte.service';

type SelectableEntity = IUser | ICompte;

@Component({
  selector: 'jhi-personne-update',
  templateUrl: './personne-update.component.html'
})
export class PersonneUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  comptes: ICompte[] = [];

  editForm = this.fb.group({
    id: [],
    code: [],
    prenom: [],
    nom: [],
    telephone: [],
    active: [],
    assignedTo: [],
    comptes: []
  });

  constructor(
    protected personneService: PersonneService,
    protected userService: UserService,
    protected compteService: CompteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personne }) => {
      this.updateForm(personne);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));

      this.compteService
        .query()
        .pipe(
          map((res: HttpResponse<ICompte[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICompte[]) => (this.comptes = resBody));
    });
  }

  updateForm(personne: IPersonne): void {
    this.editForm.patchValue({
      id: personne.id,
      code: personne.code,
      prenom: personne.prenom,
      nom: personne.nom,
      telephone: personne.telephone,
      active: personne.active,
      assignedTo: personne.assignedTo,
      comptes: personne.comptes
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personne = this.createFromForm();
    if (personne.id !== undefined) {
      this.subscribeToSaveResponse(this.personneService.update(personne));
    } else {
      this.subscribeToSaveResponse(this.personneService.create(personne));
    }
  }

  private createFromForm(): IPersonne {
    return {
      ...new Personne(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      active: this.editForm.get(['active'])!.value,
      assignedTo: this.editForm.get(['assignedTo'])!.value,
      comptes: this.editForm.get(['comptes'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonne>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: ICompte[], option: ICompte): ICompte {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
