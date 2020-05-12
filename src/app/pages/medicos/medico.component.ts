import {Component , OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Hospital} from '../../models/hospital.model';
import {HospitalesService} from '../../services/hospital/hospitales.service';
import {Medico} from '../../models/medico.model';
import {MedicoService} from '../../services/medico/medico.service';
import {ActivatedRoute , Router} from '@angular/router';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-medico' ,
    templateUrl: './medico.component.html' ,
    styles: []
})
export class MedicoComponent implements OnInit {
    hospitales: Hospital[] = [];
    medico: Medico = new Medico('' , '' , '' , '' , '');
    hospital: Hospital = new Hospital('');

    constructor( public hospitalesService: HospitalesService ,
                 public medicoService: MedicoService ,
                 public router: Router ,
                 public activatedRoute: ActivatedRoute ,
                 public modalUploadService: ModalUploadService ) {

        activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if ( id !== 'nuevo' ) {
                this.cargarMedico(id);
            }
        });
    }

    ngOnInit(): void {
        this.hospitalesService.cargarHospitales()
            .subscribe(( resp: any ) => {
                console.log(resp);
                this.hospitales = resp.hospitales;
                console.log(this.hospitales);
            });
        this.modalUploadService.notificacion
            .subscribe(resp => {
                this.medico.img = resp.medico.img;
            });
    }

    guardarMedico( f: NgForm ) {
        console.log(f.valid);
        console.log(f.value);

        if ( f.invalid ) {
            return;
        }
        this.medicoService.crearMedico(this.medico)
            .subscribe(medico => {
                this.medico._id = medico._id;
                this.router.navigate(['/medico' , medico._id]);
            });
    }

    cambioHospital( event: string ) {
        this.hospitalesService.obtenerHospital(event)
            .subscribe(data => {
                this.hospital = data;
                console.log(this.hospital);
            });
    }

    cargarMedico( id: string ) {
        this.medicoService.cargarMedico(id)
            .subscribe(data => {
                this.medico = data;
                this.medico.hospital = data.hospital._id;
                this.cambioHospital(this.medico.hospital);
            });
    }

    cambiarFoto() {
        this.modalUploadService.mostarModal('medicos' , this.medico._id);
    }
}
