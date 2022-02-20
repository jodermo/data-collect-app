import { Component, OnInit } from '@angular/core';
import { DataCollectService } from '../../data-collect.service';

@Component({
  selector: 'app-data-table-editor',
  templateUrl: './data-table-editor.component.html',
  styleUrls: ['./data-table-editor.component.scss']
})
export class DataTableEditorComponent implements OnInit {

  constructor(public dataCollect: DataCollectService) {
  }

  ngOnInit(): void {
  }

}
