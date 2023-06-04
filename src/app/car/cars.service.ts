import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, switchMap, toArray } from 'rxjs';
import { Option } from '../shared/select/select.component';

export interface CarMaker {
  id: number;
  car: string;
}

export interface CarModelResponse {
  Cars: CarModel[];
}

export interface ModelYearResponse {
  Cars: ModelYear[];
}

export interface ModelYear {
  id: number;
  car_model_year: string;
}

export interface CarModel {
  id: number;
  car_model: string;
}

export interface Year {
  id: number;
  year: string;
}

export interface Month {
  id: number;
  month: string;
}

export interface Bank {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  url = 'http://localhost:3000';
  fakeApi = 'https://myfakeapi.com';

  carModels = new BehaviorSubject<CarModel[]>([]);
  modelYears = new BehaviorSubject<ModelYear[]>([]);
  years = new BehaviorSubject<Year[]>([]);
  months = new BehaviorSubject<Month[]>([]);
  banks = new BehaviorSubject<Bank[]>([]);

  constructor(private http: HttpClient) {}

  convertData(property: string, data: any[]): Option[] {
    return data.map((option: any) => ({
      id: option.id,
      label: option[property],
    }));
  }

  getCarMakers() {
    return this.http.get<CarMaker[]>(`${this.url}/manufacturers`);
  }

  getCarModels(name: string) {
    this.http
      .get<CarModelResponse>(`${this.fakeApi}/api/cars/name/${name}`)
      .pipe(map((res) => res.Cars))
      .subscribe((res) => {
        this.carModels.next(res);
      });
  }

  getModelYear(model: string) {
    this.http
      .get<ModelYearResponse>(`${this.fakeApi}/api/cars/model/${model}`)
      .pipe(
        map((res) => res.Cars),
        switchMap((modelYears) => of(...modelYears)),
        map(({ id, car_model_year }) => ({
          id,
          car_model_year: car_model_year.toString(),
        })),
        toArray()
      )
      .subscribe((res) => {
        this.modelYears.next(res);
      });
  }

  getYears() {
    this.http
      .get<Year[]>('/assets/years.json')
      .pipe(
        switchMap((years) => of(...years)),
        map(({ id, year }) => ({ id, year: year.toString() })),
        toArray()
      )
      .subscribe((years) => {
        this.years.next(years);
      });
  }

  getMonths() {
    this.http.get<Month[]>('/assets/months.json').subscribe((months) => {
      this.months.next(months);
    });
  }

  getBanks() {
    this.http.get<Bank[]>('/assets/banks.json').subscribe((banks) => {
      this.banks.next(banks);
    });
  }

  checkCPRNo(cpr: string) {
    const params = new HttpParams().set('cpr', cpr);
    return this.http
      .get(`${this.url}/checkCPR`, {
        params,
      })
      .pipe(
        map(() => null),
        catchError((err) => {
          if (!err.status) {
            return of({ networkError: true });
          } else if (err.error.valid === false) {
            return of({ invalid: true });
          }
          return of({ unknownError: true });
        })
      );
  }
}
