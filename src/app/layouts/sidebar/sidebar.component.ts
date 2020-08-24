import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roleIds: any;
}

export const ROUTES: RouteInfo[] = [
    { path: '/case', title: 'My Cases', icon: 'nc-bank', class: '', roleIds: [1, 4] },
    // { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [] },
    // { path: '/users', title: 'All Users', icon: 'nc-bank', class: '', roleIds: [] },
    { path: '/', title: 'My Dockets', icon: 'nc-bank', class: '', roleIds: [2] },
    { path: '/app-setting', title: 'My SuperAdmin View', icon: 'nc-bank', class: '', roleIds: [7] },
    { path: '/', title: 'Law Library', icon: 'nc-bank', class: '', roleIds: [4, 5, 6] },
    { path: '/', title: 'Legal Research Assistance', icon: 'nc-bank', class: '', roleIds: [4, 6] },
    { path: '/', title: 'Legal Forms', icon: 'nc-bank', class: '', roleIds: [1, 2] },
    { path: '/', title: 'Ask a lawyer', icon: 'nc-bank', class: '', roleIds: [3, 4, 7] },
    { path: '/', title: 'Hire a lawyer', icon: 'nc-bank', class: '', roleIds: [3, 6, 7] },
    { path: '/', title: 'Message My lawyer', icon: 'nc-bank', class: '', roleIds: [1, 3] },
    { path: '/', title: 'Video My lawyer', icon: 'nc-bank', class: '', roleIds: [1, 3, 7] },
    { path: '/', title: 'Bail Bonds', icon: 'nc-bank', class: '', roleIds: [1, 4, 6, 7] }
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
        this.filteredMenuItems = ROUTES.filter(menu => {
            let isExist = menu.roleIds.find(roleId => roleId == this.userRole.roleId);
            if (isExist) {
                return menu;
            }
        });
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