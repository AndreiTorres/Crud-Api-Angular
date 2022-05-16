import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLoggedIn = false;
  private suscripcion: Subscription;
  
  constructor(private tokenService: TokenStorageService,
    private router: Router) { 
    this.suscripcion = this.tokenService.obtenerActualizacion().subscribe(message => {
      this.isLoggedIn = message;
    })
  }

  ngOnInit(): void {
    
    if (this.tokenService.obtenerToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }


  cerrarSesion() {
    this.tokenService.cerrarSesion();
    this.isLoggedIn = false;
    // this.actualizarPagina();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }


}
