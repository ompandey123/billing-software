import { Component, OnInit } from '@angular/core';
import User from '../models/register';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];

  constructor(private router: Router, private bs: BillingService){
   
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers()
  {
    this.bs.getUsers().subscribe(
      data=>{
        this.users = data
      }
    )
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.bs.deleteUser(userId).subscribe(
        () => {
          // Refresh the user list after deletion
          this.getAllUsers();
        },
        error => {
          console.error('Error deleting user:', error);
          // Handle error gracefully, e.g., show an error message
        }
      );
    }
  }

  username: String="";
  email: String="";
  password:String ="";
  contact: String="";
  userType: String="";

  addUser(){
    const newUser: User = {
      username: this.username,
      email: this.email,
      password: this.password,
      contact:this.contact,
      userType: this.userType
    };
    this.bs.addNewUser(newUser).subscribe(
      (result)=>{
        this.users.push(result);
        
        // Clear form fields
        this.username = "";
        this.email = "";
        this.password = "";
        this.contact = "";
        this.userType = "";
      },
      (error)=>{
        console.log("Error adding", error);
      }
    )
  }

}
