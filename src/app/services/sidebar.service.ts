import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    public menu: any = [{
        titulo: 'Principal' ,
        icono: 'mdi mdi-gauge' ,
        submenu: [
            {titulo: 'Dasboard' , url: '/dashboard'} ,
            {titulo: 'ProgressBar' , url: '/progress'} ,
            {titulo: 'Graficas' , url: '/graficas1'} ,
            {titulo: 'Promesas' , url: '/promesas'} ,
            {titulo: 'Rxjs' , url: '/rxjs'}
        ]
    } ,
        {
            titulo: 'Mantenimientos' ,
            icono: 'mdi mdi folder-lock-open' ,
            submenu: [
                {titulo: 'Usuarios' , url: '/usuarios'} ,
                {titulo: 'Hospitales' , url: '/hospitales'} ,
                {titulo: 'Medicos' , url: '/medicos'} ,
                {titulo: 'Usuarios' , url: '/usuarios'} ,
            ]
        }
    ];

    constructor() {
    }
}
