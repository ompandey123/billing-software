// registration.component.ts
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
export class RegistrationComponent implements OnInit {
  animationState = 'initial';
  form: FormGroup; // Add this line

  registrationData = {
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    userType: '',
  };

  userTypes = [
    { value: 'supplier', label: 'Supplier' },
    { value: 'retailer', label: 'Retailer' }
  ];

  constructor(private fb: FormBuilder) {
    // Initialize the form with required validators
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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
}
