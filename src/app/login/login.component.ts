//import { Component } from '@angular/core';
//import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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

export class LoginComponent implements OnInit{

  animationState = 'initial';
  form: FormGroup;
  username: string = '';
  password: string = '';

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
  ngOnInit(): void{}
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
  
}
