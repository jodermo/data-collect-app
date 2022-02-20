import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataCollectService } from '../../data-collect.service';

@Component({
  selector: 'app-api-result-table',
  templateUrl: './api-result-table.component.html',
  styleUrls: ['./api-result-table.component.scss']
})
export class ApiResultTableComponent implements OnInit , OnChanges{
  @Input() data: any;
  @Input() parentKey?: string;
  @Input() parentKeyMap: string[] = [];

  entryNames: string[] = [];
  entryValues: any = {};
  entryTypes: any = {};
  keyMap: string[] = [];

  tableData: any[] = [];

  constructor(public dataCollect: DataCollectService) {
  }

  ngOnInit(): void {
    this.parseData();

  }

  ngOnChanges(changes: SimpleChanges) {
    this.parseData();
  }

  parseData() {
    if (this.data) {
      this.entryNames = [];
      this.entryValues = {};
      for (const key in this.data) {
        this.entryNames.push(key);
        this.entryValues[key] = this.data[key];
        this.entryTypes[key] = typeof this.data[key];
        this.tableData.push({key});
      }
    }
    this.keyMap = [];
    if (this.parentKeyMap) {
      for (const key of this.parentKeyMap) {
        this.keyMap.push(key);
      }
    }
    if (this.parentKey) {
      this.keyMap.push(this.parentKey);
    }
  }

  contentColspan(entryName: string) {
    return ((this.entryTypes[entryName] === 'object') ? 4 : 1);
  }

  addEntry(entryName: any) {
    if (this.entryTypes[entryName] !== 'object') {
      this.dataCollect.addNewColumn(entryName);
      this.parseData();
      this.dataCollect.api.addAttributeMapping(entryName, this.keyMap, entryName)
    }

  }
}
