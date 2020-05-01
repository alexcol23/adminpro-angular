import {Component , OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {UsuarioService} from "../../services/usuario/usuario.service";

@Component({
    selector: 'app-sidebard' ,
    templateUrl: './sidebard.component.html' ,
    styles: []
})
export class SidebardComponent implements OnInit {

    constructor( public sidebarService: SidebarService,
                 public usuarioService: UsuarioService) {
    }

    ngOnInit(): void {
    }

}
