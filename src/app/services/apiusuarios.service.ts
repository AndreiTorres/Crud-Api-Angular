import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiusuariosService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  postUsuario(userName: string, email: string, password: string) {
    let endpoint = "http://localhost:3000/api/users/signup";
    
    let header: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json"
    });

    let body = {
      "userName": userName,
      "email": email,
      "password": password 
    }  

    return this.http.post<any>(endpoint, body, {headers: header});
  }

  getUsuario() {
    let header = new HttpHeaders().set('user_token', this.tokenStorage.obtenerToken() || '');
    header.set("Content-Type", "application/json");
    return this.http.get<any>("http://localhost:3000/api/users/", {headers: header});
  }

  putUsuario(usuario: any, id: number) {
    let body = usuario;
    let header = new HttpHeaders().set('user_token', this.tokenStorage.obtenerToken() || '');
    return this.http.put<any>("http://localhost:3000/api/users/" + id, body,  {headers: header});
  }

  deleteUsuario(id: number) {
    let header = new HttpHeaders().set('user_token', this.tokenStorage.obtenerToken() || '');
    return this.http.delete<any>("http://localhost:3000/api/users/" + id,  {headers: header});
  }
}
