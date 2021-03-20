import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prek-play';

  constructor(private router: Router) {
  }

  navigateMenu(path: string){
      this.router.navigate(['/' + path]);
  }

}
