import {Component , OnInit} from '@angular/core';
import {Medico} from '../../models/medico.model';
import {MedicoService} from '../../services/medico/medico.service';
import {Hospital} from '../../models/hospital.model';
import Swal from "sweetalert2";

@Component({
    selector: 'app-medicos' ,
    templateUrl: './medicos.component.html' ,
    styles: []
})
export class MedicosComponent implements OnInit {
    medicos: Medico[] = [];
    desde: number = 0;
    totalMedicos: number = 0;
    cargando: boolean = true;

    constructor( public medicoService: MedicoService ) {
    }

    ngOnInit(): void {
        this.cargarMedicos();
    }

    cargarMedicos() {
        this.cargando = true;
        this.medicoService.cargarMedicos(this.desde)
            .subscribe(( data: any ) => {
                console.log(data);
                this.totalMedicos = data.total;
                this.medicos = data.medicos;
                this.cargando = false;
            });
    }

    buscarMedicos( termino: string ) {
        if ( termino.length <= 0 ) {
            this.cargarMedicos();
            return;
        }
        this.cargando = true;
        this.medicoService.buscarMedicos(termino)
            .subscribe(( medicos: Medico[] ) => {
                this.cargando = false;
                this.medicos = medicos;
                console.log(medicos);
            });
    }

    cambiarDesde( valor: number ) {
        const desde = this.desde + valor;
        if ( desde >= this.totalMedicos ) {
            return;
        }
        if ( desde < 0 ) {
            return;
        }
        this.desde += valor;
        this.cargarMedicos();
    }

    borrarMedico( medico: Medico ) {
        Swal.fire({
                title: '¿Esta seguro?' ,
                text: 'Esta a punto de borrar el medico ' + medico.nombre ,
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
                    this.medicoService.borrarMedico(medico._id).subscribe(borrado => {
                        this.cargarMedicos();
                    });

                } else if ( borrar.dismiss === Swal.DismissReason.cancel ) {
                    Swal.fire('Cancelado' , 'Tranquilo no se ha borrado nada!!' , 'error');
                }

            });
    }


}
