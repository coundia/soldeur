import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { ICompte, Compte } from 'app/shared/model/compte.model';
import { CompteService } from './compte.service';

@Component({
  selector: 'jhi-compte-update',
  templateUrl: './compte-update.component.html'
})
export class CompteUpdateComponent implements OnInit {
  isSaving = false;
  dateUpdateDp: any;

  editForm = this.fb.group({
    id: [],
    code: [],
    solde: [],
    soldeAvant: [],
    description: [],
    dateUpdate: [],
    active: []
  });

  constructor(protected compteService: CompteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compte }) => {
      this.updateForm(compte);
    });
  }

  updateForm(compte: ICompte): void {
    this.editForm.patchValue({
      id: compte.id,
      code: compte.code,
      solde: compte.solde,
      soldeAvant: compte.soldeAvant,
      description: compte.description,
      dateUpdate: compte.dateUpdate,
      active: compte.active
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const compte = this.createFromForm();
    if (compte.id !== undefined) {
      this.subscribeToSaveResponse(this.compteService.update(compte));
    } else {
      this.subscribeToSaveResponse(this.compteService.create(compte));
    }
  }

  private createFromForm(): ICompte {
    return {
      ...new Compte(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      solde: this.editForm.get(['solde'])!.value,
      soldeAvant: this.editForm.get(['soldeAvant'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateUpdate: this.editForm.get(['dateUpdate'])!.value,
      active: this.editForm.get(['active'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompte>>): void {
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
}
