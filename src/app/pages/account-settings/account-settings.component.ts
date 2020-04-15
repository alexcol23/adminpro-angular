import {Component , Inject , OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {SettingsService} from '../../services/settings.service';


@Component({
    selector: 'app-account-settings' ,
    templateUrl: './account-settings.component.html' ,
    styles: []
})
export class AccountSettingsComponent implements OnInit {

    constructor( public settingsService: SettingsService ) {
    }

    ngOnInit(): void {
    }

    cambiarTema( tema: string , link: any ) {
        this.aplicarCheck(link);
        this.settingsService.aplicarTema(tema);

    }

    aplicarCheck( link: any ) {
        const selectores: any = document.getElementsByClassName('selector');
        for (const ref of selectores) {
            ref.classList.remove('working');
        }
        link.classList.add('working');
    }

}
