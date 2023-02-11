import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {
    @Input() isSigningIn: boolean;
    @Output() isSigningInChange = new EventEmitter<boolean>()
    
    handleRegisterLink() {
        this.isSigningIn = !this.isSigningIn;
        this.isSigningInChange.emit(this.isSigningIn)
    }
}