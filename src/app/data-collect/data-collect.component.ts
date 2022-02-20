import { Component, OnInit } from '@angular/core';
import { DataCollectService } from './data-collect.service';

@Component({
  selector: 'app-data-collect',
  templateUrl: './data-collect.component.html',
  styleUrls: ['./data-collect.component.scss']
})
export class DataCollectComponent implements OnInit {

  constructor(public dataCollect: DataCollectService) {
  }

  ngOnInit(): void {
  }

}
