import {Component , OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {SubirArchivoService} from '../../services/subir-archivo/subir-archivo.service';
import {ModalUploadService} from '../modal-upload/modal-upload.service';

@Component({
    selector: 'app-modal-upaload' ,
    templateUrl: './modal-upaload.component.html' ,
    styles: []
})
export class ModalUpaloadComponent implements OnInit {

    imagenSubir: File;
    imagentemp: string | ArrayBuffer;

    constructor( public subirArchivoService: SubirArchivoService ,
                 public modalUploadService: ModalUploadService ) {
        console.log('modal listo');
    }

    ngOnInit(): void {
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

    subirImagen() {
        console.log('subiendo imagen');
        this.subirArchivoService.subirArchivo(this.imagenSubir , this.modalUploadService.tipo , this.modalUploadService.id)
            .then(resp => {
                console.log(resp);
                this.modalUploadService.notificacion.emit(resp);
                this.cerrarModal();
            })
            .catch(err => {
                console.log('error al subir la imagen');
            });
    }

    cerrarModal() {
        this.imagentemp = null;
        this.imagenSubir = null;
        this.modalUploadService.ocultarModal();
    }
}
