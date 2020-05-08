import {Component , OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {UsuarioService} from "../../services/usuario/usuario.service";
import {Usuario} from "../../models/usuario.model";

@Component({
    selector: 'app-sidebard' ,
    templateUrl: './sidebard.component.html' ,
    styles: []
})
export class SidebardComponent implements OnInit {
    usuario: Usuario;

    constructor( public sidebarService: SidebarService ,
                 public usuarioService: UsuarioService ) {
    }

    ngOnInit(): void {
        this.usuario = this.usuarioService.usuario;
    }

}
