import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Headers } from '@angular/http';
import { Constants } from '../Constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  genders = ['male', 'female'];
  roles = ['student', 'trainer'];
  includEmpCodes = ['52472', '52473'];
  name: string;
  empCode: string;
  email: string;
  contact: string;
  gender: string;
  role: string;
  password: string;
  confirm_password: string;
  pass: string;
  cpass: string;
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      empCode: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contact: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        this.invalidContact.bind(this)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      gender: new FormControl('male'),
      role: new FormControl('student'),
      confirm_password: new FormControl(null, [
        Validators.required,
        this.invalidConfirmPass.bind(this)
      ])
    });
  }

  includedEmpCodes(control: FormControl): { [s: string]: boolean } {
    if (this.includEmpCodes.indexOf(control.value) < 0) {
      return { empCodeIsNotPresent: true };
    }
    return null;
  }

  invalidContact(control: FormControl): { [s: string]: boolean } {
    if (isNaN(control.value)) {
      return { incorrectContact: true };
    }
    return null;
  }

  invalidConfirmPass(control: FormControl) {
    if (this.pass !== control.value) {
      return { passNotMatch: true };
    }
    return null;
  }

  onSubmit() {
    this.name = this.signUpForm.value.name;
    this.empCode = this.signUpForm.value.empCode;
    this.email = this.signUpForm.value.email;
    this.contact = this.signUpForm.value.contact;
    this.password = this.signUpForm.value.password;
    this.confirm_password = this.signUpForm.value.confirm_password;
    this.gender = this.signUpForm.value.gender;
    this.role = this.signUpForm.value.role;

    // Create an Object of Header specifying the content type and pass it to the method
    const header = new Headers({ 'Content-Type': 'text-plain' });

    this.httpService.post_api(Constants.REGISTER, this.signUpForm.value, header)
      .subscribe(data => {
        console.log(data);
      });
    this.signUpForm.reset();
  }
}
