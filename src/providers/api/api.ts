import { RequestOptions } from "../../models/request-options";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs/Observable";

@Injectable()
export class Api {
    constructor(public http: HttpClient) {}

    get<T>(url: string, params?: any, reqOpts?: RequestOptions): Observable<T> {
        if (!reqOpts) {
            reqOpts = new RequestOptions();
            reqOpts.params = new HttpParams();
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }

        return this.http.get<T>(url, reqOpts);
    }

    post(url: string, body: any, reqOpts?: any) {
        return this.http.post(url, body, reqOpts);
    }

    put(url: string, body: any, reqOpts?: any) {
        return this.http.put(url, body, reqOpts);
    }

    delete(url: string, reqOpts?: any) {
        return this.http.delete(url, reqOpts);
    }

    patch(url: string, body: any, reqOpts?: any) {
        return this.http.patch(url, body, reqOpts);
    }
}
