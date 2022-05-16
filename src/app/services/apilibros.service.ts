import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApilibrosService {

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService) { }

  postLibro(libro: any) {
    let header = new HttpHeaders().set('user_token', this.tokenStorage.obtenerToken() || '');
    header.set("Content-Type", "application/json");
    return this.http.post<any>("http://localhost:3000/api/books", libro,  {headers: header});
  }

  getLibro() {
    return this.http.get<any>("http://localhost:3000/api/books");
  }

  putLibro(libro: any, id: number) {
    let body = libro;
    let header = new HttpHeaders().set('user_token', this.tokenStorage.obtenerToken() || '');
    return this.http.put<any>("http://localhost:3000/api/books/" + id, body,  {headers: header});
  }

  deleteLibro(id: number) {
    let header = new HttpHeaders().set('user_token', this.tokenStorage.obtenerToken() || '');
    return this.http.delete<any>("http://localhost:3000/api/books/" + id,  {headers: header});
    
  }
}
