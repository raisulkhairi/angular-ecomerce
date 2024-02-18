import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";
import { environtment } from "src/assets/environments/environtment";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    constructor(
        private http: HttpClient
    ) { }

    getProducts(limit: number, skip: number, select: string): Observable<any[]> {
        const params = new HttpParams()
            .set('limit', limit)
            .set('skip', skip)
            .set('select', select)
        return this.http.get<any[]>(`${environtment.serviceApi}/products`, { params })
    }

    getProduct(productId: number): Observable<any> {
        return this.http.get<any>(`${environtment.serviceApi}/products/${productId}`)
    }

    searchProducts(query: string): Observable<any[]> {
        const params = new HttpParams().set('q', query);
        return this.http.get<any[]>(`${environtment.serviceApi}/products/search`, { params })
    }

    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(`${environtment.serviceApi}/products/categories`);
    }

    getProductsByCategory(category: string): Observable<any[]> {
        return this.http.get<any[]>(`${environtment.serviceApi}/products/category/${category}`)
    }

    addProduct(product:any): Observable<any> {
        return this.http.post(`${environtment.serviceApi}/products/add`, product)
    }
}