import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '[alt] learner';
  subtitle: string;
  user: SocialUser | null;
  loggedIn = false;

  constructor(private router: Router, private authService: SocialAuthService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user !== null);
    });
  }

  navigateMenu(path: string, subtitle: string) {
    this.subtitle = subtitle;
    this.router.navigate(['/' + path]);
  }

  login() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/']);
    this.snackbar.open('You have been logged out. Thank you for using this application.')
  }
}
