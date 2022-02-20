import { Component } from '@angular/core';
import { DataCollectService } from './data-collect/data-collect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dataCollect: DataCollectService) {
  }

}
