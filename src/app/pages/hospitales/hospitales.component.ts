import {Component , OnInit} from '@angular/core';
import {HospitalesService} from '../../services/hospital/hospitales.service';
import {Hospital} from '../../models/hospital.model';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-hospitales' ,
    templateUrl: './hospitales.component.html' ,
    styleUrls: []
})
export class HospitalesComponent implements OnInit {
    hospitales: Hospital[] = [];
    desde: number = 0;
    totalHospitales: number = 0;
    cargando: boolean = true;

    constructor( public hospitalesService: HospitalesService ,
                 public modalUploadService: ModalUploadService ) {
    }

    ngOnInit(): void {
        this.cargarHospitales();

        this.modalUploadService.notificacion
            .subscribe(resp => {
                this.cargarHospitales();
            });

    }

    cargarHospitales() {
        this.cargando = true;
        this.hospitalesService.cargarHospitales(this.desde)
            .subscribe(( data: any ) => {
                console.log(data);
                this.totalHospitales = data.total;
                this.hospitales = data.hospitales;
                this.cargando = false;
            });
    }

    cambiarDesde( valor: number ) {
        const desde = this.desde + valor;
        if ( desde >= this.totalHospitales ) {
            return;
        }
        if ( desde < 0 ) {
            return;
        }
        this.desde += valor;
        this.cargarHospitales();
    }

    buscarHospitales( termino: string ) {
        if ( termino.length <= 0 ) {
            this.cargarHospitales();
            return;
        }
        this.cargando = true;
        this.hospitalesService.buscarHospitales(termino)
            .subscribe(( hospitales: Hospital[] ) => {
                this.cargando = false;
                this.hospitales = hospitales;
                console.log(hospitales);
            });
    }

    borrarHospital( hospital: Hospital ) {
        Swal.fire({
                title: '¿Esta seguro?' ,
                text: 'Esta a punto de borrar el hospital ' + hospital.nombre ,
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
                    this.hospitalesService.borrarHospital(hospital._id).subscribe(borrado => {
                        this.cargarHospitales();
                    });

                } else if ( borrar.dismiss === Swal.DismissReason.cancel ) {
                    Swal.fire('Cancelado' , 'Tranquilo no se ha borrado nada!!' , 'error');
                }

            });
    }

    actualizarHospital( hospital: Hospital ) {
        this.hospitalesService.actualizarHospital(hospital)
            .subscribe();
    }

    mostrarModal( id: string ) {
        this.modalUploadService.mostarModal('hospitales' , id);
    }

    crearHospital() {

        Swal.fire({
            title: 'Crear Hospital' ,
            text: 'Ingrese el nombre del Hospital' ,
            input: 'text' ,
            inputAttributes: {
                autocapitalize: 'off'
            } ,
            showCancelButton: true ,
            cancelButtonText: 'Cancelar' ,
            confirmButtonText: 'Guardar' ,
            showLoaderOnConfirm: true ,
            allowOutsideClick: () => !Swal.isLoading()
        }).then(( valor ) => {
            if ( !valor.value || valor.value.length === 0 ) {
                return;
            }

            this.hospitalesService.crearHospital(valor.value)
                .subscribe(() => this.cargarHospitales());
        });

    }
}
