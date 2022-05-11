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
      title: new FormControl('', [Validators.required]),    
      author: new FormControl('', [Validators.required]),    
      description: new FormControl('', [Validators.required]),    
      price: new FormControl('', [Validators.required]),    
      image: new FormControl('', [Validators.required]),    
      gender: new FormControl('', [Validators.required]),    
    })

    if (this.datosEditados) {
      this.accion = "Formulario actualizar libro";
      this.accionBtn = "Actualizar";
      this.libroForm.controls['isbn'].setValue(this.datosEditados.isbn);
      this.libroForm.controls['title'].setValue(this.datosEditados.title);
      this.libroForm.controls['author'].setValue(this.datosEditados.author);
      this.libroForm.controls['description'].setValue(this.datosEditados.description);
      this.libroForm.controls['price'].setValue(this.datosEditados.price);
      this.libroForm.controls['image'].setValue(this.datosEditados.image);
      this.libroForm.controls['gender'].setValue(this.datosEditados.gender);
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
