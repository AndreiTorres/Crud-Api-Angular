import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiusuariosService {

  constructor(private http: HttpClient) { }

  postUsuario(usuario: any) {
    return this.http.post<any>("http://localhost:3000/usuarios/", usuario);
  }

  getUsuario() {
    return this.http.get<any>("http://localhost:3000/usuarios/");
  }

  putUsuario(usuario: any, id: number) {
    return this.http.put<any>("http://localhost:3000/usuarios/" + id, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete<any>("http://localhost:3000/usuarios/" + id);
  }
}
