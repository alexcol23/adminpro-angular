import {Component , OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';

@Component({
    selector: 'app-sidebard' ,
    templateUrl: './sidebard.component.html' ,
    styles: []
})
export class SidebardComponent implements OnInit {

    constructor( public sidebarService: SidebarService) {
    }

    ngOnInit(): void {
    }

}
