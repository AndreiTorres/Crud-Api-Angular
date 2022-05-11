import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,  NgForm} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ApiusuariosService } from '../services/apiusuarios.service';

@Component({
  selector: 'app-dialogusuarios',
  templateUrl: './dialogusuarios.component.html',
  styleUrls: ['./dialogusuarios.component.css']
})
export class DialogusuariosComponent implements OnInit {
  accion: string = "Formulario agregar usuario";
  usuarioForm: FormGroup;
  accionBtn: string = "Guardar";
  constructor(private formBuilder: FormBuilder, 
    private apiUsuario: ApiusuariosService, 
    private dialogRef: MatDialogRef<DialogusuariosComponent>, 
    @Inject(MAT_DIALOG_DATA) public datosEditados: any) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      usuario: new FormControl('', [Validators.required]),    
      contrasena: new FormControl('', [Validators.required]),    
      email: new FormControl('', [Validators.required]),     
    })

    if (this.datosEditados) {
      this.accion = "Formulario actualizar usuario"
      this.accionBtn = "Actualizar";
      this.usuarioForm.controls['usuario'].setValue(this.datosEditados.usuario);
      this.usuarioForm.controls['contrasena'].setValue(this.datosEditados.contrasena);
      this.usuarioForm.controls['email'].setValue(this.datosEditados.email);
    }
  }

  agregarUsuario() {
    if (!this.datosEditados) {
      if (this.usuarioForm.valid) {
        this.apiUsuario.postUsuario(this.usuarioForm.value)
        .subscribe({
          next: (res) => {
            alert("Usuario agregado");
            this.usuarioForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Error al agregar el usuario");
          }
        })
        
      }
    } else {
      this.actualizarUsuario();
    }
  }

  actualizarUsuario() {
    this.apiUsuario.putUsuario(this.usuarioForm.value, this.datosEditados.id)
    .subscribe({
      next: (res) => {
        alert("Usuario actualizado");
        this.usuarioForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Error al actualizar el usuario")
      }
    })
  }




}
