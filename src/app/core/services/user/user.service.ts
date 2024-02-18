import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }

    private url = 'http://jsonplaceholder.org'

    getUser(userId: number): Observable<any> {
        return this.http.get(`${this.url}/users/${userId}`)
    }
}