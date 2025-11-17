import {Component,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../auth.service";
import {FormControl} from "@angular/forms";
import {EndpointHandler} from "../../endpoint/EndpointHandler";
import {ErrorHandler} from "../../error_handling/ErrorHandler";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usernameControl: FormControl;
  passwordControl: FormControl;

  loginFailed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    private endpointHandler: EndpointHandler,
    private errorHandler: ErrorHandler) {

    this.usernameControl = new FormControl();
    this.passwordControl = new FormControl();
  }

  handleLogin() {
    this.endpointHandler.login(this.usernameControl.value, this.passwordControl.value).then(
      (isValid) => {
        if (isValid) {
          this.authenticationService.createSessionToken(this.usernameControl.value, this.passwordControl.value);
          this.loginFailed = false;
          this.router.navigate([""]);
        } else {
          this.loginFailed = true;
        }
      },
      (error) => {
        this.errorHandler.showError("Login failed with: " + error);
      });
  }

  handleLogout() {
    this.authenticationService.logout();
    this.endpointHandler.logout().then(
      () => {},
      (error) => {
        this.errorHandler.showError("Logout failed with: " + error);
      }
    )
  }
}
