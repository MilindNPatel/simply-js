import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.firstName == undefined || user.lastName == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
        return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateProfile(profile) {
    if((profile.firstName == undefined || profile.lastName == undefined || profile.email == undefined || profile.contactNo == undefined || profile.address == undefined) && (profile.firstName == "" || profile.lastName == "" || profile.email == "" || profile.contactNo == "" || profile.address == "")) {
        return false;
    } else {
      return true;
    }
  }

}
