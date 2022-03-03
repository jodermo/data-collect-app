import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataCollectService } from '../../data-collect.service';

@Component({
  selector: 'app-api-result-table',
  templateUrl: './api-result-table.component.html',
  styleUrls: ['./api-result-table.component.scss']
})
export class ApiResultTableComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() parentKey?: string;
  @Input() parentKeyMap: string[] = [];

  entryNames: string[] = [];
  entryValues: any = {};
  entryTypes: any = {};
  keyMap: string[] = [];

  tableData: any[] = [];
  isMapped: any = {};
  colspan: any = {};
  loading = false;

  selectedAttribute?: any;
  isObjectResult = false;

  parseTimeout?: any;
  parseDelay = 0;

  constructor(public dataCollect: DataCollectService) {
  }


  ngOnInit(): void {
    this.parseData();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.parseData();
  }

  addAttributeMapping(entryName: string) {
    this.dataCollect.api.addAttributeMapping(entryName, this.keyMap);
    this.selectedAttribute = undefined;
    this.updateMapped();
  }

  removeAttributeMapping(entryName: string) {
    this.dataCollect.api.removeAttributeMapping(entryName);
    this.updateMapped();
  }

  parseData() {
    this.loading = true;
    if (this.parseTimeout) {
      clearTimeout(this.parseTimeout);
    }
    this.parseTimeout = setTimeout(() => {
      if (this.data) {
        this.entryNames = [];
        this.tableData = [];
        this.entryValues = {};
        this.entryTypes = {};
        this.isMapped = {};
        this.colspan = {};
        this.entryValues = {};
        this.isObjectResult = false;
        for (const key in this.data) {
          this.entryNames.push(key);
          this.entryValues[key] = this.data[key];
          this.entryTypes[key] = typeof this.data[key];
          this.isMapped[key] = this.dataCollect.isMapped(key, this.parentKey, this.keyMap);
          const isObject = (this.entryTypes[key] === 'object');
          if (isObject) {
            this.isObjectResult = true;
          }
          this.colspan[key] = (isObject ? 4 : 1);
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
      this.updateMapped();
    }, this.parseDelay);
  }

  updateMapped() {
    this.loading = true;
    this.isMapped = {};
    for (const key in this.data) {
      this.isMapped[key] = this.dataCollect.isMapped(key, this.parentKey, this.keyMap);
    }
    this.loading = false;
  }

  clearObjectData(obj: any) {
    if (obj) {
      for (const key in obj) {
        obj[key] = undefined;
      }
    }
  }

  contentColspan(entryName: string) {
    return ((this.entryTypes[entryName] === 'object') ? 4 : 1);
  }

  addEntry(entryName: any) {
    if (this.entryTypes[entryName] !== 'object') {
      this.dataCollect.addNewColumn(entryName);
      this.dataCollect.api.addAttributeMapping(entryName, this.keyMap, entryName);
      this.updateMapped();
    }

  }
}
