import {Component , OnInit} from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {UsuarioService} from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import {ModalUploadService} from "../../components/modal-upload/modal-upload.service";

@Component({
    selector: 'app-usuario' ,
    templateUrl: './usuario.component.html' ,
    styles: []
})
export class UsuarioComponent implements OnInit {

    usuarios: Usuario[] = [];
    desde: number = 0;
    totalUsuarios: number = 0;
    cargando: boolean = true;

    constructor( public usuarioService: UsuarioService ,
                 public modalUploadService: ModalUploadService ) {
    }

    ngOnInit(): void {
        this.cargarUsuarios();

        this.modalUploadService.notificacion
            .subscribe(resp => {
                this.cargarUsuarios();
            });
    }

    cargarUsuarios() {
        this.cargando = true;
        this.usuarioService.cargarUsuarios(this.desde)
            .subscribe(( data: any ) => {
                console.log(data);
                this.totalUsuarios = data.total;
                this.usuarios = data.usuarios;
                this.cargando = false;
            });
    }

    cambiarDesde( valor: number ) {
        const desde = this.desde + valor;
        if ( desde >= this.totalUsuarios ) {
            return;
        }
        if ( desde < 0 ) {
            return;
        }
        this.desde += valor;
        this.cargarUsuarios();
    }

    buscarUsuario( termino: string ) {
        if ( termino.length <= 0 ) {
            this.cargarUsuarios();
            return;
        }
        this.cargando = true;
        this.usuarioService.buscarUsuarios(termino)
            .subscribe(( usuarios: Usuario[] ) => {
                console.log(usuarios);
            });
    }

    borrarUsuario( usuario: Usuario ) {
        if ( usuario._id === this.usuarioService.usuario._id ) {
            Swal.fire({
                title: 'Importante' ,
                text: 'No puede borrar el usuario con el que se encuentra logeado.' ,
                icon: 'warning'
            });
            return;
        }
        Swal.fire({
                title: '¿Esta seguro?' ,
                text: 'Esta a punto de borrar a ' + usuario.nombre ,
                icon: 'warning' ,
                showCancelButton: true ,
                confirmButtonColor: '#3085d6' ,
                cancelButtonColor: '#d33' ,
                confirmButtonText: 'Si, borralo' ,
                cancelButtonText: 'No, cancela' ,
                reverseButtons: true
            })
            .then(borrar => {

                if ( borrar.value ) {
                    this.usuarioService.borrarUsuario(usuario._id).subscribe(borrado => {
                        this.cargarUsuarios();
                    });

                } else if ( borrar.dismiss === Swal.DismissReason.cancel ) {
                    Swal.fire('Cancelado' , 'Tranquilo no se ha borrado nada!!' , 'error');
                }

            });
    }

    actualizarUsuario( usuario: Usuario ) {
        this.usuarioService.actualizarUsuario(usuario)
            .subscribe();
    }

    mostrarModal( id: string ) {
        this.modalUploadService.mostarModal('usuarios' , id);
    }
}
