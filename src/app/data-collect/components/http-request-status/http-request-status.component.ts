import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-request-status',
  templateUrl: './http-request-status.component.html',
  styleUrls: ['./http-request-status.component.scss']
})
export class HttpRequestStatusComponent implements OnInit {
  @Input() httpRequest?: any;
  @Input() layout: ('table' | 'list') = 'table';
  @Input() direction: ('column' | 'row') = 'column';

  attributes = [
    'status',
    'responseType',
    'readyState',
    'statusText',
    'timeout',
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
