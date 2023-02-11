import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss']
})
export class AppRegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  username = '';
  password = '';
  errorMessage = '';
  
  handleRegister() {
    this.authService.registerUser(this.username, this.password).subscribe(payload => {
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