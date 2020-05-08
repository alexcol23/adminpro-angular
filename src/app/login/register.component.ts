import {Component , OnInit} from '@angular/core';
import {FormControl , FormGroup , Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {UsuarioService} from '../services/usuario/usuario.service';
import {Usuario} from "../models/usuario.model";
import {Router} from "@angular/router";


declare function init_plugins();

@Component({
    selector: 'app-register' ,
    templateUrl: './register.component.html' ,
    styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

    forma: FormGroup;

    constructor( public usuarioService: UsuarioService,
                 public router: Router) {
    }

    sonIguales( val1: string , val2: string ) {
        return ( formGroup: FormGroup ) => {
            const pass1 = formGroup.controls[val1].value;
            const pass2 = formGroup.controls[val2].value;

            if ( pass1 === pass2 ) {
                return null;
            }
            return {
                sonIguales: true
            };
        };
    }

    ngOnInit(): void {
        init_plugins();


        this.forma = new FormGroup({
            nombre: new FormControl('' , Validators.required) ,
            correo: new FormControl('' , [Validators.required , Validators.email]) ,
            password: new FormControl('' , Validators.required) ,
            password2: new FormControl('' , Validators.required) ,
            condiciones: new FormControl(false)
        } , {validators: this.sonIguales('password' , 'password2')});


        this.forma.setValue({
            nombre: 'test' ,
            correo: 'alex@hotmail.com' ,
            password: '123456' ,
            password2: '123456' ,
            condiciones: true
        });
    }

    registrarUsuario() {
        if ( this.forma.invalid ) {
            return;
        }

        if ( !this.forma.value.condiciones ) {
            Swal.fire({
                title: 'Importante' ,
                text: 'Debe aceptar las condiciones' ,
                icon: 'warning'
            });
        }

        const usuario = new Usuario(
            this.forma.value.nombre ,
            this.forma.value.correo ,
            this.forma.value.password
        );
        this.usuarioService.crearUsuario(usuario)
            .subscribe(data => {
                this.router.navigate(['/login']);
            });
    }
}
