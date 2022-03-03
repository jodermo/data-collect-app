import { ApiResult } from './api-result';
import { ApiService } from '../services/api.service';
import * as xml2js from 'xml2js';

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
  urlSuffix?: string;
  addSuffix = false;
  keyAttribute?: string;
  sendKeyAsBearer?: boolean;
  slashSeparator = false;
  attributesAsBody = true;

  httpRequest = new XMLHttpRequest();
  result = new ApiResult(this);
  private domParser = new DOMParser();
  private xmlParser = new xml2js.Parser


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
    const loaded = (data: any) => {
      if (typeof data === 'object') {
        data = [data];
      }
      this.result.dataType = typeof data;
      this.result.setResult(data);
      this.do('loaded', this.result.data);
    }
    this.httpRequest.onreadystatechange = () => {
      if (this.httpRequest.readyState == 4 && this.httpRequest.status == 200) {
        let data: any = this.httpRequest.responseText;
        this.result.error = undefined;
        this.result.date = Date.now();
        console.log('result', data);
        try {
          data = JSON.parse(data);
          console.log('JSON result', data);
          loaded(data);
        } catch (e) {
          // data = this.domParser.parseFromString(data, "text/xml");
          this.xmlParser.parseStringPromise(data)
            .then((result) => {
              console.log('XML result', result);
              loaded(result);
              console.log('Done');
            })
            .catch((err: any) => {
              console.log('XML err', err);
              loaded(data);
              console.log('Done');
            });
          this.result.loading = false;
        }


      } else if (this.httpRequest.readyState == 4 && this.httpRequest.status == 0) {
        console.log('loaded', this.httpRequest);
        this.result.loading = false;
        this.do('loaded', undefined);
      } else {
        this.result.setError(this.httpRequest.status, this.httpRequest.responseText);
        this.result.loading = false;
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
