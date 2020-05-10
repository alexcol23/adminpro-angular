import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../../models/usuario.model';
import {URL_SERVICES} from '../../config/config';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {SubirArchivoService} from "../subir-archivo/subir-archivo.service";


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    usuario: Usuario;
    token: string;

    constructor( public http: HttpClient ,
                 public router: Router ,
                 public subirArchivoService: SubirArchivoService ) {

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
                this.guardarStorage(resp.id , resp.token , resp.usuario);
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

    actualizarUsuario( usuario: Usuario ) {
        const url = URL_SERVICES + '/usuario/' + usuario._id + '?token=' + this.token;
        return this.http.put(url , usuario)
            .pipe(map(( res: any ) => {
                if ( usuario._id === this.usuario._id ) {
                    this.guardarStorage(res.usuario._id , this.token , res.usuario);
                }
                Swal.fire({
                    title: 'Usuario actualizado correctamente' ,
                    text: usuario.email ,
                    icon: 'success'
                });
                return true;
            }));
    }

    cambiarImagen( archivo: File , id: string ) {
        this.subirArchivoService.subirArchivo(archivo , 'usuarios' , id)
            .then(( resp: any ) => {
                this.usuario.img = resp.usuario.img;
                Swal.fire({
                    title: 'Imagen de usuario actualizado correctamente' ,
                    icon: 'success'
                });
                this.guardarStorage(id , this.token , this.usuario);
            })
            .catch(resp => {
                console.log(resp);
            });
    }

    cargarUsuarios( desde: number = 0 ) {
        const url = URL_SERVICES + '/usuario?desde=' + desde;
        return this.http.get(url);
    }

    buscarUsuarios( termino: string ) {
        const url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;
        return this.http.get(url)
            .pipe(map(( resp: any ) => resp.usuarios));

    }

    borrarUsuario( id: string ) {
        let url = URL_SERVICES + '/usuario/' + id;
        url += '?token=' + this.token;
        return this.http.delete(url)
            .pipe(map(resp => {
                Swal.fire({
                    title: 'Hecho' ,
                    text: 'Se ha eliminado correctament el usuario.' ,
                    icon: 'success'
                });
                return true;
            }));
    }
}
