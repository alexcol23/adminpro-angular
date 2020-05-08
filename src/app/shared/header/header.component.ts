import {Component , OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario/usuario.service";
import {Usuario} from "../../models/usuario.model";
import {THIS_EXPR} from "@angular/compiler/src/output/output_ast";

@Component({
    selector: 'app-header' ,
    templateUrl: './header.component.html' ,
    styles: []
})
export class HeaderComponent implements OnInit {

    usuario: Usuario;

    constructor( public usuarioService: UsuarioService ) {
    }

    ngOnInit(): void {
        this.usuario = this.usuarioService.usuario;
    }

}
