import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UserType } from '../../../models/models';

export interface NavigationItem {
  value: string;
  link: string;
  icon: string; // New icon property
}

@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrl: './page-side-nav.component.scss',
})
export class PageSideNavComponent {
  panelName: string = '';
  navItems: NavigationItem[] = [];

  loggedNav: boolean = true;

  constructor(private apiService: ApiService, private router: Router) {
    apiService.userStatus.subscribe({
      next: (status) => {
        if (status == 'loggedIn') {
          this.loggedNav = true;
          router.navigateByUrl('/home');
          let user = apiService.getUserInfo();
          if (user != null) {
            if (user.userType == UserType.ADMIN) {
              this.panelName = 'Admin Panel';
              this.navItems = [
                { value: 'View Books', link: '/home',icon: 'bi-box' },
                { value: 'Maintenance', link: '/maintenance', icon: 'bi-gear' },
                { value: 'Return Book', link: '/return-book', icon: 'bi-arrow-repeat' },
                { value: 'View Users', link: '/view-users', icon: 'bi-person-lines-fill' },
                { value: 'Approval Requests', link: '/approval-requests', icon: 'bi-file-earmark-check' },
                { value: 'All Orders', link: '/all-orders', icon: 'bi-box' },
                { value: 'My Orders', link: '/my-orders', icon: 'bi-box-arrow-in-right' },
              ];
            } else if (user.userType == UserType.STUDENT) {
              this.panelName = 'Student Panel';
              this.navItems = [
                { value: 'View Books', link: '/home', icon: 'bi-house-door' },
                { value: 'My Orders', link: '/my-orders', icon: 'bi-box-arrow-in-right' },
              ];
            }
          }
        } else if (status == 'loggedOff') {
          this.loggedNav = false;
          this.panelName = 'Auth Panel';
          router.navigateByUrl('/login');
          this.navItems = [];
        }
      },
    });
  }
}
