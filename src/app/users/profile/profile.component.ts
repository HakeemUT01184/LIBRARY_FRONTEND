import { Component , OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { UserType } from '../../models/models';

export interface TableElement {
  name: string;
  value: string;
}

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent  implements OnInit {
  columns: string[] = ['name', 'value'];
  dataSource: TableElement[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    let user = this.apiService.getUserInfo()!;
    if (user){
    this.dataSource = [
      { name: "Name", value: user.firstName + " " + user.lastName },
      { name: "Email", value: `${user.email}` },
      { name: "Mobile", value: `${user.mobileNumber}` },
      { name: "Account Status", value: `${user.accountStatus}` },
      { name: "Created On", value: `${user.createdOn}` },
      { name: "Type", value: `${UserType[user.userType]}` },
    ];
  }
    else{
  console. error('Method not implemented.');
  }
}
}

