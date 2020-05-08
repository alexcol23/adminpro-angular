import {Component , OnInit} from '@angular/core';
import {Usuario} from "../../models/usuario.model";
import {UsuarioService} from "../../services/usuario/usuario.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-profile' ,
    templateUrl: './profile.component.html' ,
    styles: []
})
export class ProfileComponent implements OnInit {

    usuario: Usuario;
    imagenSubir: File;
    imagentemp: string | ArrayBuffer;

    constructor( public usuarioService: UsuarioService ) {
        this.usuario = this.usuarioService.usuario;
    }

    ngOnInit(): void {
    }

    guardar( usuario: Usuario ) {
        this.usuario.nombre = usuario.nombre;
        if ( !this.usuario.google ) {
            this.usuario.email = usuario.email;
        }
        this.usuarioService.actualizarUsuario(this.usuario)
            .subscribe(data => {
                console.log(data);
            });
    }

    sleccionImage( archivo: File ) {
        if ( !archivo ) {
            this.imagenSubir = null;
            return;
        }

        if ( archivo.type.indexOf('image') ) {
            Swal.fire({
                title: 'Importante' ,
                text: 'DEl archivo seleccionado no es una imgen.' ,
                icon: 'warning'
            });
            this.imagenSubir = null;
            return;
        }
        this.imagenSubir = archivo;
        const reader = new FileReader();
        const urlImagenTemp = reader.readAsDataURL(archivo);
        reader.onload = () => this.imagentemp = reader.result;
        console.log(archivo);

    }

    cambiarImagen() {
        this.usuarioService.cambiarImagen(this.imagenSubir , this.usuario._id);
    }
}
