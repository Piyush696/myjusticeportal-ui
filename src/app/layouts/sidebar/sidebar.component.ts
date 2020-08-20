import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/case', title: 'My Cases', icon: 'nc-bank', class: '' },
    // { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    // { path: '/users', title: 'All Users', icon: 'nc-bank', class: '' },
    { path: '/', title: 'My Dockets', icon: 'nc-bank', class: '' },
    { path: '/app-setting', title: 'My SuperAdmin View', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Law Library', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Legal Research Assistance', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Legal Forms', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Ask a lawyer', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Hire a lawyer', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Message My lawyer', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Video My lawyer', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Bail Bonds', icon: 'nc-bank', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    styleUrls: ['./sidebar.component.scss'],
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    currentMenu: any;

    constructor(private router: Router) { };

    ngAfterViewInit() {
        if (this.router.url) {
            this.currentMenu = this.menuItems.find(x => x.path == this.router.url);
        }
        if (this.currentMenu) {
            setTimeout(() => {
                let elem: HTMLElement = document.getElementById(this.currentMenu.path);
                elem.classList.add('active');
                elem.classList.add('currentMenu');
            }, 100);
        }
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    onChangeMenu(path) {
        setTimeout(() => {
            var x = <HTMLElement[]><any>document.getElementsByClassName('label-bg');
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove('active');
                x[i].classList.remove('currentMenu');
            }
        }, 50);
        this.currentMenu = this.menuItems.find(x => x.path == path);
        setTimeout(() => {
            let elem: HTMLElement = document.getElementById(this.currentMenu.path);
            elem.classList.add('active');
            elem.classList.add('currentMenu');
        }, 200);
    }
}