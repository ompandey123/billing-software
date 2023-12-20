// registration.component.ts
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import User from '../models/register';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
    trigger('slideLeftAnimation', [
      state('initial', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        }),
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class RegistrationComponent{
  animationState = 'initial';
  form: FormGroup; // Add this line

  registrationData = {
    username: '',
    password: '',
    email: '',
    contact: '',
    userType: '',
  };



  userTypes = [
    { value: 'supplier', label: 'Supplier' },
    { value: 'retailer', label: 'Retailer' }
  ];

  constructor(private fb: FormBuilder, private router: Router, private bs: BillingService) {
    // Initialize the form with required validators
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      contact: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  onAnimationDone() {
    this.animationState = 'initial';
  }

  onSubmit() {
    // Implement registration logic here using this.registrationData
    if (this.form.valid) {
      console.log('Registration Data:', this.registrationData);
      // Additional registration logic goes here
    }
  }

  register(){
    const newUser: User = {
      username: this.registrationData.username,
      email: this.registrationData.email,
      password: this.registrationData.password,
      contact: this.registrationData.contact,
      userType: this.registrationData.userType
    };
    this.bs.register(newUser).subscribe(
      (result)=>{
        this.router.navigate(['login']);
        console.log("User Registered",result);
      },
      (error)=>{
        console.log("Error registering", error);
      }
    )
  }
}
