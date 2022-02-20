import { Component, OnInit } from '@angular/core';
import { DataCollectService } from '../../data-collect.service';

@Component({
  selector: 'app-data-collect-header',
  templateUrl: './data-collect-header.component.html',
  styleUrls: ['./data-collect-header.component.scss']
})
export class DataCollectHeaderComponent implements OnInit {

  constructor(public dataCollect: DataCollectService) {
  }

  ngOnInit(): void {
  }

}
