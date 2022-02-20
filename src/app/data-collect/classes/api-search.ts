import { ApiResult } from './api-result';
import { ApiService } from '../services/api.service';

export class ApiSearch {


  id?: number;
  date = Date.now();
  url?: string;
  fullUrl = '';
  method = 'GET';
  sendCustomAttributes = false;
  attributes: string[] = [];
  sendKey = false;
  key?: string;
  urlSuffix?:string;
  addSuffix = false;
  keyAttribute?: string;
  sendKeyAsBearer?: boolean;
  slashSeparator = false;
  attributesAsBody = true;

  httpRequest = new XMLHttpRequest();
  result = new ApiResult(this);


  private callbacks: any = {};

  constructor(apiService: ApiService) {
    this.fullUrl = apiService.getSearchUrl();
    this.sendCustomAttributes = apiService.sendCustomAttributes;
    this.attributes = apiService.attributes;
    this.sendKey = apiService.sendKey;
    this.addSuffix = apiService.addSuffix;
    this.urlSuffix = apiService.urlSuffix;
    this.key = apiService.key;
    this.keyAttribute = apiService.keyAttribute;
    this.sendKeyAsBearer = apiService.sendKeyAsBearer;
    this.slashSeparator = apiService.slashSeparator;
    this.attributesAsBody = apiService.attributesAsBody;

    this.startCall();
  }

  private createHeaders(httpRequest = this.httpRequest) {
    if (this.sendKeyAsBearer && this.keyAttribute && this.key) {
      httpRequest.setRequestHeader('WWW-Authenticate', 'Bearer ' + this.keyAttribute + '="' + this.key + '"');
    }
  }

  private startCall() {
    this.httpRequest.onreadystatechange = () => {
      if (this.httpRequest.readyState == 4 && this.httpRequest.status == 200) {
        let data: any;
        this.result.error = undefined;
        this.result.date = Date.now();
        try {
          data = JSON.parse(this.httpRequest.responseText);
        } catch (e) {
          data = this.httpRequest.responseText;
        }
        if (typeof data === 'object') {
          data = [data];
        }
        this.result.dataType = typeof data;
        this.result.setResult(data);
        this.do('loaded', this.result.data);
      } else {
        this.result.setError(this.httpRequest.status, this.httpRequest.responseText)
      }
    }
    this.httpRequest.open(this.method, this.fullUrl, true);
    this.createHeaders(this.httpRequest);
    this.httpRequest.send(null);
  }

  public on(callbackName: string, callback: any) {
    if (!this.callbacks[callbackName]) {
      this.callbacks[callbackName] = [];
    }
    this.callbacks[callbackName].push(callback);
  }

  private do(callbackName: string, callbackData?: any) {
    if (this.callbacks[callbackName]) {
      for (const callback of this.callbacks[callbackName]) {
        callback(callbackData);
      }
    }
  }

}
