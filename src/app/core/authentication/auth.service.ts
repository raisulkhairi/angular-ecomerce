import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environtment } from "src/assets/environments/environtment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    login(username: string, password: string): Observable<any> {
        const body = { username, password };
        return this.http.post(`${environtment.serviceApi}/auth/login`, body);
    };

    logout() {
        localStorage.setItem('isLoggedIn', 'false');
        this.router.navigate(['login'])
    }

    isLoggedlIn(): boolean {
        const getValueIsLoggedLn = (localStorage.getItem('isLoggedIn'));
        return getValueIsLoggedLn === 'true';
    }


}