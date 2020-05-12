import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {PagesComponent} from './pages.component';
import {SharedModule} from '../shared/shared.module';
import {PAGES_ROUTES} from './pages.routes';
import {FormsModule} from '@angular/forms';
import {IncrementadorComponent} from '../components/incrementador/incrementador.component';
import {ChartsModule} from 'ng2-charts';
import {GraficoDonaComponent} from '../components/grafico-dona/grafico-dona.component';
import {CommonModule} from '@angular/common';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {PipesModule} from '../pipes/pipes.module';
import {ProfileComponent} from './profile/profile.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {ModalUpaloadComponent} from '../components/modal-upaload/modal-upaload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';


@NgModule({
    declarations: [
        DashboardComponent ,
        ProgressComponent ,
        Graficas1Component ,
        PagesComponent ,
        IncrementadorComponent ,
        GraficoDonaComponent ,
        AccountSettingsComponent ,
        PromesasComponent ,
        RxjsComponent ,
        ProfileComponent ,
        UsuarioComponent ,
        ModalUpaloadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent

    ] ,
    exports: [
        DashboardComponent ,
        ProgressComponent ,
        Graficas1Component ,
        PagesComponent
    ] ,
    imports: [
        SharedModule ,
        PAGES_ROUTES ,
        FormsModule ,
        ChartsModule ,
        CommonModule ,
        PipesModule ,
        CommonModule
    ]
})
export class PagesModule {
}
