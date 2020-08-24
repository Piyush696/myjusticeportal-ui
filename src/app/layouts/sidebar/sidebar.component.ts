import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

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
    public filteredMenuItems: any[];
    currentMenu: any;
    userRole: any;

    constructor(private router: Router, private store: Store<any>) { };

    ngAfterViewInit() {
        if (this.router.url) {
            this.currentMenu = this.filteredMenuItems.find(x => x.path == this.router.url);
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
        this.store.select(s => s.userInfo).subscribe(x => {
            this.userRole = x.role[0];
        })
        this.filterMenuByUser();
    }

    filterMenuByUser() {
        // this.filteredMenuItems = ROUTES.filter(menuItem => menuItem);
        if (this.userRole.name == 'User') {
            this.filteredMenuItems = ROUTES.filter(menu => menu.title == 'My Cases' || menu.title == 'Hire a lawyer');
        }
        else if (this.userRole.name == 'Facility') {
            this.filteredMenuItems = ROUTES.filter(menu => menu);
        }
        else if (this.userRole.name == 'Paralegal') {
            this.filteredMenuItems = ROUTES.filter(menu => menu);
        }
        else if (this.userRole.name == 'Lawyer') {
            this.filteredMenuItems = ROUTES.filter(menu => menu.title == 'Law Library' || menu.title == 'Legal Research Assistance');
        }
        else if (this.userRole.name == 'Public Defender') {
            this.filteredMenuItems = ROUTES.filter(menu => menu.title == 'My SuperAdmin View');
        }
        else if (this.userRole.name == 'Bondsman') {
            this.filteredMenuItems = ROUTES.filter(menu => menu.title == 'Bail Bonds');
        }
        else if (this.userRole.name == 'Superadmin') {
            this.filteredMenuItems = ROUTES.filter(menu => menu);
        }
        else {
            this.filteredMenuItems = ROUTES.filter(menu => menu);
        }
    }

    onChangeMenu(path) {
        setTimeout(() => {
            var x = <HTMLElement[]><any>document.getElementsByClassName('onHoverMenuItem');
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove('active');
                x[i].classList.remove('currentMenu');
            }
        }, 50);
        this.currentMenu = this.filteredMenuItems.find(x => x.path == path);
        if (this.currentMenu.path != '/') {
            setTimeout(() => {
                let elem: HTMLElement = document.getElementById(this.currentMenu.path);
                elem.classList.add('active');
                elem.classList.add('currentMenu');
            }, 200);
        }
    }
}