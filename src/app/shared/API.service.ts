import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";

enum Method {
  get = "get",
}

export const URL = {
  PERSON: 'https://www.swapi.tech/api/people',
  STARSHIPS: 'https://www.swapi.tech/api/starships'
}

@Injectable({
  providedIn: 'root'
})
export class API {

  public URL = URL

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  get(url: string, param?: { page: number, limit: number }): any {
    return this.process(Method.get, url, param)
  }

  private process(method: Method, url: string, param?: {page: number, limit: number}) {
    return this.http[method](url, { params: param })
        .pipe(
            map(res => res),
            catchError(err => {
                console.log(err);
                return throwError(() => err);
            })
        )
    }
};
