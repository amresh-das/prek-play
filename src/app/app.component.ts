import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '[alt] learner';
  subtitle: string;

  constructor(private router: Router) {
  }

  navigateMenu(path: string, subtitle: string) {
    this.subtitle = subtitle;
    this.router.navigate(['/' + path]);
  }

}
