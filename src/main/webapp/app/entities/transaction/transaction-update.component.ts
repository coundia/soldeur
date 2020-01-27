import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { ITransaction, Transaction } from 'app/shared/model/transaction.model';
import { TransactionService } from './transaction.service';
import { IPersonne } from 'app/shared/model/personne.model';
import { PersonneService } from 'app/entities/personne/personne.service';

@Component({
  selector: 'jhi-transaction-update',
  templateUrl: './transaction-update.component.html'
})
export class TransactionUpdateComponent implements OnInit {
  isSaving = false;

  personnes: IPersonne[] = [];
  dateOperationDp: any;

  editForm = this.fb.group({
    id: [],
    code: [],
    montant: [],
    soldeApres: [],
    soldeAvant: [],
    dateOperation: [],
    etat: [],
    personne: []
  });

  constructor(
    protected transactionService: TransactionService,
    protected personneService: PersonneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transaction }) => {
      this.updateForm(transaction);

      this.personneService
        .query()
        .pipe(
          map((res: HttpResponse<IPersonne[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPersonne[]) => (this.personnes = resBody));
    });
  }

  updateForm(transaction: ITransaction): void {
    this.editForm.patchValue({
      id: transaction.id,
      code: transaction.code,
      montant: transaction.montant,
      soldeApres: transaction.soldeApres,
      soldeAvant: transaction.soldeAvant,
      dateOperation: transaction.dateOperation,
      etat: transaction.etat,
      personne: transaction.personne
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transaction = this.createFromForm();
    if (transaction.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionService.update(transaction));
    } else {
      this.subscribeToSaveResponse(this.transactionService.create(transaction));
    }
  }

  private createFromForm(): ITransaction {
    return {
      ...new Transaction(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      montant: this.editForm.get(['montant'])!.value,
      soldeApres: this.editForm.get(['soldeApres'])!.value,
      soldeAvant: this.editForm.get(['soldeAvant'])!.value,
      dateOperation: this.editForm.get(['dateOperation'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      personne: this.editForm.get(['personne'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransaction>>): void {
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

  trackById(index: number, item: IPersonne): any {
    return item.id;
  }
}
