import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../../models/usuario.model';
import {URL_SERVICES} from '../../config/config';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    usuario: Usuario;
    token: string;

    constructor( public http: HttpClient ,
                 public router: Router ) {

        console.log('servicio de usuario listo');
        this.cargarStorage();
    }

    estaLogueado() {
        return ( this.token.length > 5 );
    }

    cargarStorage() {
        if ( localStorage.getItem('token') ) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
        } else {
            this.token = '';
            this.usuario = null;
        }
    }

    guardarStorage( id: string , token: string , usuario: Usuario ) {
        localStorage.setItem('id' , id);
        localStorage.setItem('token' , token);
        localStorage.setItem('usuario' , JSON.stringify(usuario));
        this.usuario = usuario;
        this.token = token;
    }

    loginGoogle( token: string ) {
        const url = URL_SERVICES + '/login/google';
        return this.http.post(url , {token})
            .pipe(map(( resp: any ) => {
                console.log('------usuario-----');
                console.log(resp);
                this.guardarStorage(resp.id , resp.token , resp.usuarioDB);
                return true;
            }));
    }

    login( usuario: Usuario , recuerdame: boolean = false ) {
        if ( recuerdame ) {
            localStorage.setItem('email' , usuario.email);
        } else {
            localStorage.removeItem('email');
        }

        const url = URL_SERVICES + '/login';
        return this.http.post(url , usuario)
            .pipe(map(( resp: any ) => {
                this.guardarStorage(resp.id , resp.token , usuario);
                return true;
            }));
    }

    logout() {
        this.usuario = null;
        this.token = '';
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        this.router.navigate(['/login']);
    }

    crearUsuario( usuario: Usuario ) {
        const url = URL_SERVICES + '/usuario';
        return this.http.post(url , usuario).pipe(map(( resp: any ) => {
            Swal.fire({
                title: 'Usuario creado correctamente' ,
                text: usuario.email ,
                icon: 'success'
            });
            return resp.usuario;
        }));
    }
}
