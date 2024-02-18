import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CommentService {
    constructor(private http: HttpClient) { }

    private url = 'http://jsonplaceholder.org'

    getComment(postId: number): Observable<any> {
        return this.http.get(`${this.url}/comments/${postId}`)
    }
}