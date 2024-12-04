// import { Component } from '@angular/core';
// import { ApiService } from '../../services/api.service';
// import { Router } from '@angular/router';
// import { UserType } from '../../../models/models';

// export interface NavigationItem {
//   value: string;
//   link: string;
// }

// @Component({
//   selector: 'page-side-nav',
//   templateUrl: './page-side-nav.component.html',
//   styleUrl: './page-side-nav.component.scss',
// })
// export class PageSideNavComponent {
//   loggedInstatus:boolean=false;
//   panelName: string = '';
//   navItems: NavigationItem[] = [];
// username: any;

//   constructor(private apiService: ApiService, private router: Router) {
//     apiService.userStatus.subscribe({
//       next: (status) => {
//         if (status == 'loggedIn') {
//           this.loggedInstatus=true;
//           router.navigateByUrl('/home');
//           let user = apiService.getUserInfo();
//           if (user != null) {
//             if (user.userType == UserType.ADMIN) {
//               this.panelName = 'Admin Panel';
//               this.navItems = [
//                 { value: 'View Books', link: '/home' },
//                 { value: 'Maintenance', link: '/maintenance' },
//                 { value: 'Return Book', link: '/return-book' },
//                 { value: 'View Users', link: '/view-users' },
//                 { value: 'Aprooval Requests', link: '/approval-requests' },
//                 { value: 'All Orders', link: '/all-orders' },
//                 { value: 'My Orders', link: '/my-orders' },
//               ];
//             } else if (user.userType == UserType.STUDENT) {
//               this.panelName = 'Student Panel';
//               this.navItems = [
//                 { value: 'View Books', link: '/home' },
//                 { value: 'My Orders', link: '/my-orders' },
//               ];
//             }
//           }
//         } else if (status == 'loggedOff') {
//           this.loggedInstatus=false;
//           this.panelName = 'Auth Panel';
//           router.navigateByUrl('/login');
//           this.navItems = [];
//         }
//       },
//     });
//   }
// }






import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UserType } from '../../../models/models';

export interface NavigationItem {
  value: string;
  link: string;
}

@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrls: ['./page-side-nav.component.scss'],
})
export class PageSideNavComponent {
  loggedInstatus: boolean = false;
  panelName: string = '';
  navItems: NavigationItem[] = [];
  username: string = '';  // Initialize username as an empty string

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.userStatus.subscribe({
      next: (status) => {
        if (status == 'loggedIn') {
          this.loggedInstatus = true;
          this.router.navigateByUrl('/home');
          
          let user = this.apiService.getUserInfo();
          
          // Ensure that 'user' is not null or undefined
          if (user) {
            // Check if username exists and assign it, otherwise, set to a fallback string
            this.username = user.username || 'User';
            
            if (user.userType == UserType.ADMIN) {
              this.panelName = 'Admin Panel';
              this.navItems = [
                { value: 'View Books', link: '/home' },
                { value: 'Maintenance', link: '/maintenance' },
                { value: 'Return Book', link: '/return-book' },
                { value: 'View Users', link: '/view-users' },
                { value: 'Approval Requests', link: '/approval-requests' },
                { value: 'All Orders', link: '/all-orders' },
                { value: 'My Orders', link: '/my-orders' },
              ];
            } else if (user.userType == UserType.STUDENT) {
              this.panelName = 'Student Panel';
              this.navItems = [
                { value: 'View Books', link: '/home' },
                { value: 'My Orders', link: '/my-orders' },
              ];
            }
          } else {
            // In case user is not available
            this.username = 'Guest';
          }
        } else if (status == 'loggedOff') {
          this.loggedInstatus = false;
          this.panelName = 'Auth Panel';
          this.router.navigateByUrl('/login');
          this.navItems = [];
        }
      },
    });
  }
}
