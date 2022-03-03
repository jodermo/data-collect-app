import { Component, OnInit } from '@angular/core';
import { DataCollectService } from '../../data-collect.service';

@Component({
  selector: 'app-api-result',
  templateUrl: './api-result.component.html',
  styleUrls: ['./api-result.component.scss']
})
export class ApiResultComponent implements OnInit {
  tabs = [
    {alias: 'table', title: 'Table'},
    {alias: 'json', title: 'JSON Data'}
    ]
  tab = this.tabs[0];

  constructor(public dataCollect: DataCollectService) {
  }

  ngOnInit(): void {
  }

}
