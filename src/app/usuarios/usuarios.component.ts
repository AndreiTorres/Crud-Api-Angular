import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogusuariosComponent } from '../dialogusuarios/dialogusuarios.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiusuariosService } from '../services/apiusuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['Usuario', 'Contraseña', 'Correo', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private apiUsuarios: ApiusuariosService) {}

  ngOnInit(): void {
    this.obtenerTodosUsuarios();
  }

  
  openDialog() {
    this.dialog.open(DialogusuariosComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.obtenerTodosUsuarios();
      }
    })
  }

  obtenerTodosUsuarios() {
    this.apiUsuarios.getUsuario()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error al cargar los usuarios");
      }
    })
  }


  editarUsuario(row: any) {
    this.dialog.open(DialogusuariosComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.obtenerTodosUsuarios();
      }
    })
  }

  borrarUsuario(id: number) {
    this.apiUsuarios.deleteUsuario(id)
    .subscribe({
      next: (res) => {
        alert("Usuario eliminado!");
        this.obtenerTodosUsuarios();
      },
      error: () => {
        alert("Error al eliminar el usuario!");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generarReporte() {
    console.log("Reporte en excel");
  }

}
