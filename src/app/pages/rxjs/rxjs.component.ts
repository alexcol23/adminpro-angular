import {Component , OnDestroy , OnInit} from '@angular/core';
import {Observable , Subscription} from 'rxjs';
import {filter , map} from 'rxjs/operators';

@Component({
    selector: 'app-rxjs' ,
    templateUrl: './rxjs.component.html' ,
    styles: []
})
export class RxjsComponent implements OnInit , OnDestroy {

    subcription: Subscription;

    constructor() {
        this.subcription = this.regresaObservable()
            .subscribe(
                numero => console.log('Subs' , numero) ,
                error => console.log('Error en el obs' , error) ,
                () => console.log('El observador termino!')
            );
    }

    ngOnInit(): void {
    }

    regresaObservable(): Observable<any> {
        return new Observable(( observer ) => {
            let contador = 0;
            const intervalo = setInterval(() => {
                contador++;
                const salida = {
                    valor: contador
                };

                observer.next(salida);

                if ( contador === 3 ) {
                    clearInterval(intervalo);
                    observer.complete();
                }

            } , 1000);
        }).pipe(
            map(( resp: any ) => {
                return resp.valor;
            }) ,
            filter(( valor , index ) => {
                if ( ( valor % 2 ) === 1 ) {
                    return true;
                } else {
                    return false;
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subcription.unsubscribe();
    }
}
