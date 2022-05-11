import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,  NgForm} from '@angular/forms';
import { ApilibrosService } from '../services/apilibros.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  accion: string = "Formulario agregar libro";
  libroForm: FormGroup;
  accionBtn: string = "Guardar";
  constructor(private formBuilder: FormBuilder, 
    private apiLibro: ApilibrosService, 
    private dialogRef: MatDialogRef<DialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public datosEditados: any,) { }

  ngOnInit(): void {
    this.libroForm = this.formBuilder.group({
      isbn: new FormControl('', [Validators.required]),    
      titulo: new FormControl('', [Validators.required]),    
      autor: new FormControl('', [Validators.required]),    
      descripcion: new FormControl('', [Validators.required]),    
      precio: new FormControl('', [Validators.required]),    
      portada: new FormControl('', [Validators.required]),    
      genero: new FormControl('', [Validators.required]),    
    })

    if (this.datosEditados) {
      this.accion = "Formulario actualizar libro";
      this.accionBtn = "Actualizar";
      this.libroForm.controls['isbn'].setValue(this.datosEditados.isbn);
      this.libroForm.controls['titulo'].setValue(this.datosEditados.titulo);
      this.libroForm.controls['autor'].setValue(this.datosEditados.autor);
      this.libroForm.controls['descripcion'].setValue(this.datosEditados.descripcion);
      this.libroForm.controls['precio'].setValue(this.datosEditados.precio);
      this.libroForm.controls['portada'].setValue(this.datosEditados.portada);
      this.libroForm.controls['genero'].setValue(this.datosEditados.genero);
    }
  }

  agregarLibro() {
    if (!this.datosEditados) {
      if (this.libroForm.valid) {
        this.apiLibro.postLibro(this.libroForm.value)
        .subscribe({
          next: (res) => {
            alert("Libro agregado");
            this.libroForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Error al agregar el libro");
          }
        })
        
      }
    } else {
      this.actualizarLibro();
    }
  }

  actualizarLibro() {
    this.apiLibro.putLibro(this.libroForm.value, this.datosEditados.id)
    .subscribe({
      next: (res) => {
        alert("Libro actualizado");
        this.libroForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Error al actualizar el libro")
      }
    })
  }

}
