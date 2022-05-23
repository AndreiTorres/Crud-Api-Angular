import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogusuariosComponent } from '../dialogusuarios/dialogusuarios.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiusuariosService } from '../services/apiusuarios.service';
import * as XLSX from 'xlsx';

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
        this.dataSource = new MatTableDataSource(res.data);
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
      } else {
        console.log(val)
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
    this.apiUsuarios.getUsuario()
    .subscribe({
      next: (res) => {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res.data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        XLSX.writeFile(workbook, this.toExportFileName("reporte")); 
      }
    })
  }

  toExportFileName(excelFileName: string): string {
    var date = new Date();
    return `${excelFileName}_${date.getMonth() + 1}${date.getDate()}${date.getFullYear()}.xlsx`;
  }

}
