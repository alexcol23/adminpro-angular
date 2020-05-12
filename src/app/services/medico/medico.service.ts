import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {map} from 'rxjs/operators';
import Swal from "sweetalert2";
import {UsuarioService} from '../usuario/usuario.service';
import {Medico} from '../../models/medico.model';

@Injectable({
    providedIn: 'root'
})
export class MedicoService {

    constructor( private http: HttpClient ,
                 public usuarioService: UsuarioService ) {
    }

    cargarMedicos( desde: number = 0 ) {
        const url = URL_SERVICES + '/medico?desde=' + desde;
        return this.http.get(url);
    }


    cargarMedico( id: string ) {
        const url = URL_SERVICES + '/medico/' + id;
        return this.http.get(url)
            .pipe(map(( resp: any ) => resp.medico));
    }

    buscarMedicos( termino: string ) {
        const url = URL_SERVICES + '/busqueda/coleccion/medicos/' + termino;
        return this.http.get(url)
            .pipe(map(( resp: any ) => resp.medicos));

    }

    borrarMedico( id: string ) {
        let url = URL_SERVICES + '/medico/' + id;
        url += '?token=' + this.usuarioService.token;
        return this.http.delete(url)
            .pipe(map(resp => {
                Swal.fire({
                    title: 'Hecho' ,
                    text: 'Se ha eliminado correctament el Medico.' ,
                    icon: 'success'
                });
                return true;
            }));
    }

    crearMedico( medico: Medico ) {
        let url = URL_SERVICES + '/medico';


        if ( medico._id ) {
            url += '/' + medico._id;
            url += '?token=' + this.usuarioService.token;
            return this.http.put(url, medico)
                .pipe(map(( resp: any ) => {
                    Swal.fire({
                        title: 'Medico Actualizado correctamente' ,
                        text: medico.nombre ,
                        icon: 'success'
                    });
                    return resp.medico;
                }));
        } else {
            url += '?token=' + this.usuarioService.token;
            return this.http.post(url , medico)
                .pipe(map(( resp: any ) => {
                    Swal.fire({
                        title: 'Medico creado correctamente' ,
                        text: medico.nombre ,
                        icon: 'success'
                    });
                    return resp.medico;
                }));
        }


    }
}
