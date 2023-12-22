//import { Component } from '@angular/core';
//import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Login from '../models/login';
import { BillingService } from '../billing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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

export class LoginComponent{

  animationState = 'initial';
  form: FormGroup;
  email: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private bs: BillingService, private router: Router){
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });

  }
  startAnimation() {
    if (this.form.valid) {
    this.animationState = 'initial'; // Reset the animation state
    setTimeout(() => {
      this.animationState = 'void'; // Trigger the animation
    });
  }
  }

  onAnimationDone(){
    this.animationState='initial';
  }

  // OnSubmit() {
  //   console.log("Form validity:", this.form.valid);
  
  //   if (this.form.valid) {
  //     const user: Login = {
  //       email: this.form.value.email,
  //       password: this.form.value.password
  //     }; 
  
  //     this.bs.login(user).subscribe(
  //       (result) => {
  //         localStorage.setItem('user', JSON.stringify(result));
  //         this.router.navigate(['dashboard']);
  //         console.log("Login Success", result);
  //       },
  //       (error) => {
  //         console.error("Login Failed", error); // Log the specific error
  //       }
  //     );
  //   } else {
  //     console.log("FILL THE FIELDS");
  //   }
  // }

  user: Login = {email:'', password:''}
  OnSubmit() {
  if (this.form.valid) {

    this.bs.login(this.user).subscribe(
      (result) => {
        // localStorage.setItem('user',result);
        localStorage.setItem('user', JSON.stringify(result));
        console.log(localStorage.getItem('user'));
        this.router.navigate(['dashboard']);
        console.log("Login Success");
      },
      (error) => {
        console.error("Login Failed", error); // Log the specific error
      }
    );
  } else {
    console.log("FILL THE FIELDS");
  }
}

  
  
}
