import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataCollectService } from '../../data-collect.service';
import { HighlightLoader } from 'ngx-highlightjs';

@Component({
  selector: 'app-api-result-json',
  templateUrl: './api-result-json.component.html',
  styleUrls: ['./api-result-json.component.scss']
})
export class ApiResultJsonComponent implements OnInit, OnChanges {
  @Input() data: any;
  jsonDataString?: string;

  constructor(public dataCollect: DataCollectService, private hljsLoader: HighlightLoader) {
  }

  ngOnInit(): void {
    this.themeChange('light');
    this.parseData();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.parseData();
  }

  parseData() {
    if (this.data) {
      this.jsonDataString = JSON.stringify(this.data, null, 4)
    } else {
      this.jsonDataString = undefined;
    }
    console.log(this.jsonDataString);
  }

  themeChange(appTheme: 'dark' | 'light') {
    this.hljsLoader.setTheme(appTheme === 'dark' ? 'assets/styles/solarized-dark.css' : 'assets/styles/solarized-light.css');
  }

}
