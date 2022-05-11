import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApilibrosService {

  constructor(private http: HttpClient) { }

  postLibro(libro: any) {
    return this.http.post<any>("http://localhost:3000/libros/", libro);
  }

  getLibro() {
    return this.http.get<any>("http://localhost:3000/libros/");
  }

  putLibro(libro: any, id: number) {
    return this.http.put<any>("http://localhost:3000/libros/" + id, libro);
  }

  deleteLibro(id: number) {
    return this.http.delete<any>("http://localhost:3000/libros/" + id);
  }
}
