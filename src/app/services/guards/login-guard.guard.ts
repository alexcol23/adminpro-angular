import {Injectable} from '@angular/core';
import {CanActivate , Router} from '@angular/router';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {


    constructor( public usuarioService: UsuarioService ,
                 public router: Router ) {
    }

    canActivate(): boolean {
        console.log('paso por el login gard');
        if ( this.usuarioService.estaLogueado() ) {
            console.log('Paso la validacion del gard');
            return true;
        } else {
            console.log('Nooo paso la validacion del gard');
            this.router.navigate(['/login']);
            return false;
        }
    }

}
