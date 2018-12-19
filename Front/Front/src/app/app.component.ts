import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  spinner: boolean;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    let self = this;

    this.spinnerService.status.subscribe((value => {
      self.spinner = value;
    }));
  }
}
