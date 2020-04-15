import {NgModule} from '@angular/core';
import {BreadcrumsComponent} from './breadcrums/breadcrums.component';
import {HeaderComponent} from './header/header.component';
import {NopagefoundComponent} from './nopagefound/nopagefound.component';
import {SidebardComponent} from './sidebard/sidebard.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [RouterModule ,
        CommonModule] ,
    declarations: [
        BreadcrumsComponent ,
        HeaderComponent ,
        NopagefoundComponent ,
        SidebardComponent
    ] ,
    exports: [
        BreadcrumsComponent ,
        HeaderComponent ,
        NopagefoundComponent ,
        SidebardComponent
    ]
})
export class SharedModule {
}
