import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

const httpOptionsJson = {
  headers: new HttpHeaders({
    'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDhmYmE3YjE0ZDgxNDMwNzI4ZTdiNGQiLCJuYW1lIjoiZXhhbXBsZSIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiZXhhbXBsZSIsInBhc3N3b3JkIjoiJDJhJDEwJEdTRzFFTkptYkhCWWhlTlZxeWZ4MnVEZTQvZTRZSnlUNk94eFpXSFVpdjlGUGs4blRtV00yIiwiX192IjowLCJpYXQiOjE1Njk3MDA1NDJ9.qE1KgQ0bOGmkPUseyhVFSKTBAy_e1J3hKFmFELvdR_c'
  }),
};

const headers = new HttpHeaders({'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIvcGF0aC90by9nYWxsZXJ5L2RlZmF1bHRBdmF0YXIucG5nIiwicm9sZSI6ImFkbWluIiwiX2lkIjoiNWQ5MDgyODFhNTkzMjU3ODcyNGQ4MTBmIiwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmEkMTAkckFoUDQuNzVSL3NMMUlQZEFZaUtRLlFMODVDZlBWUDhDVWxLLndpOGpPYm1ybTlUck9VU0ciLCJfX3YiOjAsImlhdCI6MTU2OTc1NTYyMn0.wI2mPyJuG4sUacWzEbcgLe5zrpa9kQEvrG7Oeyko_BE'
});

const baseURL = `http://localhost:3000`;
const queryAllCarsURL = `/fabcar`;
const createCarURL = `/fabcar`;
const changeCarOwnerURL = `/fabcar/changeCarOwner`;

@Injectable()
export class ApiService {

  public cars$: Subject<Array<object>> = new BehaviorSubject<Array<object>>([]);

  constructor(private http: HttpClient) {
  }

  createCar(color: string, make: string, model: string, owner: string) {
    return this.http.post(baseURL + createCarURL, ({
      'make': make,
      'model': model,
      'color': color,
      'owner': owner
    }), {headers}).toPromise().then((result) => { this.queryAllCars(); });

  }

  changeCarOwner(key: string, newOwner: string) {
    return this.http.post(baseURL + changeCarOwnerURL, {'key': key, 'newOwner': newOwner},
    {headers}).toPromise().then((result) => { this.queryAllCars(); });
  }

  queryAllCars() {
    return this.http.get<Array<any>>(baseURL + queryAllCarsURL, httpOptionsJson).subscribe((response) => {
      console.log(response);
      this.cars$.next(response);
    });
  }
}
