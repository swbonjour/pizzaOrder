import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {
    @Input() isSigningIn: boolean;
    @Output() isSigningInChange = new EventEmitter<boolean>()

    constructor(private authService: AuthService, private router: Router) {}
    
    handleRegisterLink() {
        this.isSigningIn = !this.isSigningIn;
        this.isSigningInChange.emit(this.isSigningIn)
    }

    username = '';
    password = '';
    errorMessage = '';

    handleSignIn() {
      this.authService.signInUser(this.username, this.password).subscribe(payload => {
        //@ts-ignore
        if(payload.error != null) {
        //@ts-ignore
        this.errorMessage = payload.error.payload
      }
        //@ts-ignore
        if(payload.statusCode == 200) {
          //@ts-ignore
          localStorage.setItem('token', payload.payload.token)
          this.router.navigate(['/home'])
        }
      },
      error => {
        this.errorMessage = error.error.payload
      })
    }
}