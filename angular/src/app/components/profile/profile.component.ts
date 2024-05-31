import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formData = {
    firstName: "Milind",
    lastName: "Patel",
    email: "mnp@gmail.com",
    contactNo: "9876543210",
    address: "Ahmedabad"
  }

  constructor(private authService: AuthService, private validateService: ValidateService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.formData = profile.user;
    },
      err => {
        return false;
      });
  }

  onRegisterSubmit() {

    // Required Fields
    if (!this.validateService.validateProfile(this.formData)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(this.formData.email)) {
      this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // User Profile
    this.authService.updateProfile(this.formData).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        // this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        // this.router.navigate(['/register']);
      }
    });
  }

}
