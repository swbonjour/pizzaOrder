import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './app-auth.component.html',
  styleUrls: ['./app-auth.component.scss']
})
export class AppAuthComponent {
  isSigningIn = true;

  changeIsSigingIn(newValue: boolean) {
    this.isSigningIn = newValue;
  }
}
