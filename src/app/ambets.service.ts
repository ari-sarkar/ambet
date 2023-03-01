import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable()
export class AmBetsService {
  API_END_POINT: string;

  constructor(private httpClient: HttpClient) {
    this.API_END_POINT = 'https://api.ambet.in/v1';
  }

  public handleError(error: any) {
    const errorResponse = error.error;
    // console.error('handleError', errorResponse);
    return {
      status: errorResponse._error
        ? errorResponse._error.errorCode
        : errorResponse.status,
      message: errorResponse._error
        ? errorResponse._error.detailMessage || errorResponse._error.message
        : errorResponse.message,
    };
  }

  addUser(body: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_END_POINT}/users/add`, body)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getUserByNo(page: number, size: number, no: string): Observable<any> {
    const headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('no', no);
    return this.httpClient
      .get(`${this.API_END_POINT}/users/user-by-no`, {
        params,
      })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getAllBets(page: number, size: number): Observable<any> {
    const headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.httpClient
      .get(`${this.API_END_POINT}/my-bids/get-all`, {
        params,
      })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getAllBetsBySlot(page: number, size: number, slot: string): Observable<any> {
    const headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('slot', slot);
    return this.httpClient
      .get(`${this.API_END_POINT}/my-bids/get-all-by-slot`, {
        params,
      })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }



  getAllMoney(page: number, size: number): Observable<any> {
    const headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.httpClient
      .get(`${this.API_END_POINT}/money/get`, {
        params,
      })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  addMoney(body: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_END_POINT}/money/set`, body)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  settlePayment(payload: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_END_POINT}/users/wallet-functions/${payload.id}/${payload.type}/${payload.amount}`, {})
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }


  setWinnings(payload: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_END_POINT}/winnings/save`, payload)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getResultByGameAndDate(payload: any): Observable<any> {
    const headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', payload.page);
    params = params.append('size', payload.size);
    params = params.append('id', payload.id);
    params = params.append('date', payload.date);
    return this.httpClient
      .get(`${this.API_END_POINT}/winnings/get-by-game`, {
        params,
      })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getAllUsers(page: number, size: number): Observable<any> {
    const headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.httpClient
      .get(`${this.API_END_POINT}/users/all`, {
        params,
      })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getBetsByUserId(page: number, size: number, user: string, gameId: string, type: string): Observable<any> {
    const headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('user', user);
    params = params.append('gameId', gameId);
    params = params.append('type', type);
    return this.httpClient
      .get(`${this.API_END_POINT}/my-bids/get`, {
        params,
      })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }


  setMoney(body: any, id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("id", id);
    return this.httpClient
      .post(`${this.API_END_POINT}/money/update`, body, { params })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  setBid(body: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_END_POINT}/my-bids/set`, body)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getAllGames(): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpClient
      .get(`${this.API_END_POINT}/games/get`)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  createGame(payload: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_END_POINT}/games/save`, payload)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  createSlot(payload: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_END_POINT}/slots/save`, payload)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getSlotsByGameId(id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient
      .get(`${this.API_END_POINT}/slots/get`, { params })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getAdminNo(): Observable<any> {
    return this.httpClient
      .get(`${this.API_END_POINT}/admin-numbers/get`)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }

  getAllByUrl(url: string): Observable<any> {
    return this.httpClient
      .get(`${this.API_END_POINT}${url}`)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(this.handleError(error));
        })
      );
  }
}
