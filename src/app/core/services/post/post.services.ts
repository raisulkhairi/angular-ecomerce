import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(
        private http: HttpClient
    ) { }

    private url = 'http://jsonplaceholder.org'

    getPosts(limit: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/posts`).pipe(
            map((posts) => posts.slice(0, limit))
        );
    }

    getPost(id: number): Observable<any> {
        return this.http.get<any>(`${this.url}/posts/${id}`)
    }

    getComment(postId: number): Observable<any> {
        return this.http.get<any>(`${this.url}/comments/${postId}`)
    }
}