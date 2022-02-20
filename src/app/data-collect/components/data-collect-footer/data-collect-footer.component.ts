import { Component, OnInit } from '@angular/core';
import { DataCollectService } from '../../data-collect.service';

@Component({
  selector: 'app-data-collect-footer',
  templateUrl: './data-collect-footer.component.html',
  styleUrls: ['./data-collect-footer.component.scss']
})
export class DataCollectFooterComponent implements OnInit {

  constructor(public dataCollect: DataCollectService) {
  }

  ngOnInit(): void {
  }

}
