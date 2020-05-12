import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {Hospital} from '../../models/hospital.model';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Usuario} from '../../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class HospitalesService {
    usuario: Usuario;
    token: string;

    constructor( private http: HttpClient ) {
        this.cargarStorage();
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

    cargarHospitales( desde: number = 0 ) {
        const url = URL_SERVICES + '/hospital?desde=' + desde;
        return this.http.get(url);
    }

    obtenerHospital( id: string ) {
        const url = URL_SERVICES + '/hospital/' + id;
        return this.http.get(url)
            .pipe(map(( resp: any ) => resp.hospital));
    }

    borrarHospital( id: string ) {
        let url = URL_SERVICES + '/hospital/' + id;
        url += '?token=' + this.token;
        return this.http.delete(url)
            .pipe(map(resp => {
                Swal.fire({
                    title: 'Hecho' ,
                    text: 'Se ha eliminado correctament el hospital.' ,
                    icon: 'success'
                });
                return true;
            }));
    }

    crearHospital( nombre: string ) {
        const url = URL_SERVICES + '/hospital' + '?token=' + this.token;
        const hospital = new Hospital(nombre);
        return this.http.post(url , hospital)
            .pipe(map(( resp: any ) => {
                Swal.fire({
                    title: 'Hospital creado correctamente' ,
                    text: hospital.nombre ,
                    icon: 'success'
                });
                return resp.hospital;
            }));

    }

    buscarHospitales( termino: string ) {
        const url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + termino;
        return this.http.get(url)
            .pipe(map(( resp: any ) => resp.hospitales));

    }

    actualizarHospital( hospital: Hospital ) {
        const url = URL_SERVICES + '/hospital/' + hospital._id + '?token=' + this.token;
        return this.http.put(url , hospital)
            .pipe(map(( res: any ) => {
                Swal.fire({
                    title: 'Hospital actualizado correctamente' ,
                    text: hospital.nombre ,
                    icon: 'success'
                });
                return true;
            }));
    }
}
