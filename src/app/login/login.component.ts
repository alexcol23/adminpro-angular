import {Component , OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Usuario} from "../models/usuario.model";
import {UsuarioService} from "../services/usuario/usuario.service";

declare function init_plugins();

declare const gapi: any;


@Component({
    selector: 'app-login' ,
    templateUrl: './login.component.html' ,
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    recuerdame: boolean = false;
    email: string;

    auth2: any;

    constructor( public router: Router ,
                 public usuarioService: UsuarioService ) {
    }

    ngOnInit(): void {
        init_plugins();
        this.googleInit();
        this.email = localStorage.getItem('email') || '';
        if ( this.email.length > 0 ) {
            this.recuerdame = true;
        }
    }

    googleInit() {
        gapi.load('auth2' , () => {
            this.auth2 = gapi.auth2.init({
                client_id: '324765698138-1dfmrlovj7cfl6c3g2cki5jahpdes4av.apps.googleusercontent.com' ,
                cookiepolicy: 'single_hots_origin' ,
                scope: 'profile email'
            });
            this.attachSignIn(document.getElementById('btnGoogle'));

        });
    }

    attachSignIn( element ) {
        this.auth2.attachClickHandler(element , {} , googleUser => {
            const token = googleUser.getAuthResponse().id_token;
            this.usuarioService.loginGoogle(token)
                .subscribe(success => this.router.navigate(['dashboard']));
        });

    }

    ingresar( forma: NgForm ) {
        const usuario = new Usuario(null , forma.value.email , forma.value.password);
        this.usuarioService.login(usuario , forma.value.recuerdame)
            .subscribe(success => this.router.navigate(['dashboard']));
    }
}
