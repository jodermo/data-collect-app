import { Component, OnInit } from '@angular/core';
import { DataCollectService } from '../../data-collect.service';

@Component({
  selector: 'app-api-result',
  templateUrl: './api-result.component.html',
  styleUrls: ['./api-result.component.scss']
})
export class ApiResultComponent implements OnInit {

  constructor(public dataCollect: DataCollectService) {
  }

  ngOnInit(): void {
  }

}
