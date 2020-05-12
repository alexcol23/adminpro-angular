import {Pipe , PipeTransform} from '@angular/core';
import {URL_SERVICES} from "../config/config";

@Pipe({
    name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

    transform( img: string , tipo: string = 'usuario' ): any {
        console.log('entra al pipe');
        console.log(img);
        console.log(tipo);
        let url = URL_SERVICES + '/img/';
        if ( !img ) {
            return url + 'usuarios/noImage';
        }
        if ( img.indexOf('https') >= 0 ) {
            return img;
        }
        switch ( tipo ) {
            case 'usuario':
                url += '/usuarios/' + img;
                break;
            case 'medico':
                url += 'medicos/' + img;
                break;
            case 'hospital':
                console.log('entra al pipe de los hospitales');
                url += 'hospitales/' + img;
                break;
            default:
                console.log('El tipo de imagen solicitada no existe.');
                url += 'usuarios/noImage';
        }
        console.log(url);
        return url;

    }

}
