import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPersonne } from 'app/shared/model/personne.model';

type EntityResponseType = HttpResponse<IPersonne>;
type EntityArrayResponseType = HttpResponse<IPersonne[]>;

@Injectable({ providedIn: 'root' })
export class PersonneService {
  public resourceUrl = SERVER_API_URL + 'api/personnes';

  constructor(protected http: HttpClient) {}

  create(personne: IPersonne): Observable<EntityResponseType> {
    return this.http.post<IPersonne>(this.resourceUrl, personne, { observe: 'response' });
  }

  update(personne: IPersonne): Observable<EntityResponseType> {
    return this.http.put<IPersonne>(this.resourceUrl, personne, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersonne>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersonne[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
