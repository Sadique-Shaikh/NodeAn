import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  userDetails:any;
  getUserDetails() {
    this.auth.getDetails().subscribe(
      (res) => { 
        console.log("res: ", res);
        this.userDetails = res;
       },
      (error) => { console.error("error.message: ", error.message); },
    )
  }
}
