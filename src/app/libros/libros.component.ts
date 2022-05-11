import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApilibrosService } from '../services/apilibros.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  displayedColumns: string[] = ['Portada', 'Isbn', 'Titulo', 'Autor',  'Precio', 'Genero', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private apiLibros: ApilibrosService) {}

  ngOnInit(): void {
    this.obtenerTodosLibros();
  }

  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.obtenerTodosLibros();
      }
    })
  }

  obtenerTodosLibros() {
    this.apiLibros.getLibro()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error al cargar los libros");
      }
    })
  }


  editarLibro(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.obtenerTodosLibros();
      }
    })
  }

  borrarLibro(id: number) {
    this.apiLibros.deleteLibro(id)
    .subscribe({
      next: (res) => {
        alert("Libro eliminado!");
        this.obtenerTodosLibros();
      },
      error: () => {
        alert("Error al eliminar el libro!");
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
    console.log("Reporte en PDF");
  }



}
