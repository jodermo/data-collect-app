import { Component, OnInit } from '@angular/core';
import { DataCollectService } from '../../data-collect.service';

@Component({
  selector: 'app-api-result-mapping',
  templateUrl: './api-result-mapping.component.html',
  styleUrls: ['./api-result-mapping.component.scss']
})
export class ApiResultMappingComponent implements OnInit {

  constructor(public dataCollect: DataCollectService) {
  }

  ngOnInit(): void {
  }

}
