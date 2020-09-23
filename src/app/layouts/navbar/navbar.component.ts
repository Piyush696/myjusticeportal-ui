import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CacheService } from 'app/services/cache.service';
import { Store } from '@ngrx/store';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  myAccountLink: string;

  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(location: Location, private cacheService: CacheService,
    private element: ElementRef, private router: Router, private store: Store<any>) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
    this.setMyAccountLink();
  }

  setMyAccountLink() {
    this.store.select(s => s.userInfo).subscribe(x => {
      if (x.roles[0].roleId == 1) {
        this.myAccountLink = 'user/my-account';
      }
      else if (x.roles[0].roleId == 2) {
        this.myAccountLink = 'facility/my-account';
      }
      else if (x.roles[0].roleId == 3) {
        this.myAccountLink = 'lawyer/my-account';
      }
      else if (x.roles[0].roleId == 4) {
        this.myAccountLink = 'researcher/my-account';
      }
      else if (x.roles[0].roleId == 5) {
        this.myAccountLink = 'public-defender/my-account';
      }
      else if (x.roles[0].roleId == 6) {
        this.myAccountLink = 'bondsman/my-account';
      }
      else if (x.roles[0].roleId == 7) {
        this.myAccountLink = 'superadmin/my-account';
      }
    });
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return '';
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    // console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  logout() {
    this.cacheService.removeCache("token");
    this.router.navigateByUrl('/login');
  }
}