import {Component , ElementRef , EventEmitter , Input , OnInit , Output , ViewChild} from '@angular/core';

@Component({
    selector: 'app-incrementador' ,
    templateUrl: './incrementador.component.html' ,
    styles: []
})
export class IncrementadorComponent implements OnInit {

    @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;

    @Input()
    progreso: number = 50;

    @Input()
    leyenda: string = '';

    @Output() cambiovalor: EventEmitter<number> = new EventEmitter<number>();


    constructor() {
    }

    ngOnInit(): void {
    }


    cambiarValor( valor: number ) {
        if ( this.progreso >= 100 && valor > 0 ) {
            this.progreso = 100;
            return;
        }
        if ( this.progreso <= 0 && valor < 0 ) {
            this.progreso = 0;
            return;
        }
        this.progreso = this.progreso + valor;
        this.cambiovalor.emit(this.progreso);
    }

    onChanges( newValue: any ) {
        if ( newValue >= 100 ) {
            this.progreso = 100;
        } else if ( newValue <= 0 ) {
            this.progreso = 0;
        } else {
            this.progreso = newValue;
        }
        this.txtProgress.nativeElement.valueOf = this.progreso;
        this.cambiovalor.emit(this.progreso);
        this.txtProgress.nativeElement.focus();
    }
}
