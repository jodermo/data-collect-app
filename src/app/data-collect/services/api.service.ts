import { Injectable } from '@angular/core';
import { ApiSearch } from '../classes/api-search';
import { LoadSaveDo } from '../classes/load-save-do';

export class ApiExample {
  attributes: string[] = [];
  attributeValue: any = {};
  sendCustomAttributes = false;
  icon = 'input';

  constructor(public name: string, public website: string, public documentation: string, public method: string, public url: string, options?: any, public attributesAsBody: boolean = false, public sendKeyAsBearer = false, public slashSeparator: boolean = false, public addSuffix: boolean = false, public urlSuffix?: string, public sendKey: boolean = false, keyAttribute?: string, key?: string) {
    if (options) {
      for (const key in options) {
        this.attributes.push(key);
        this.attributeValue[key] = options[key];
        this.sendCustomAttributes = true;
      }
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService extends LoadSaveDo {
  url?: string;
  addSuffix = false;
  urlSuffix?: string;
  key?: string;
  keyAttribute = 'key';
  sendKey = false;
  sendKeyAsBearer = false;
  sendCustomAttributes = false;
  slashSeparator = false;
  attributesAsBody = true;
  attributes: string[] = [];
  attributeValue: any = {};
  attributeMapping: any = {};

  newAttributeName?: string;
  newAttributeValue?: string;
  attributeMinLength = 1;

  methods = ['GET', 'POST'];
  method = this.methods[0];

  resultData?: any;
  search?: ApiSearch;
  searches: ApiSearch[] = [];
  urlMinLength = 5;

  selectedMappingAttribute?: string;

  mappingAttributes: string[] = [];
  mappingAttributesDataArray: any[] = [];
  availableMappingAttributes: string[] = [];
  mappingAttribute?: string;

  saveAttributes = [
    {name: 'api-url', valueKey: 'url', json: false},
    {name: 'api-method', valueKey: 'method', json: false},
    {name: 'api-url-suffix', valueKey: 'urlSuffix', json: false},
    {name: 'api-add-suffix', valueKey: 'addSuffix', json: true},
    {name: 'api-attributes', valueKey: 'attributes', json: true},
    {name: 'api-attribute-values', valueKey: 'attributeValue', json: true},
    {name: 'api-attribute-mapping', valueKey: 'attributeMapping', json: true},
    {name: 'api-send-key', valueKey: 'sendKey', json: true},
    {name: 'api-send-custom-attributes', valueKey: 'sendCustomAttributes', json: true},
    {name: 'api-slash-separator', valueKey: 'slashSeparator', json: true},
    {name: 'api-attributes-as-body', valueKey: 'attributesAsBody', json: true},
    {name: 'api-send-key-as-bearer', valueKey: 'sendKeyAsBearer', json: true},
  ];

  examples: ApiExample[] = [
    new ApiExample(
      'OSM Nominatim Example',
      '',
      '',
      'GET',
      'https://nominatim.openstreetmap.org/',
      {
        'q': 'Köln',
        'format': 'json',
        'polygon': '1',
        'addressdetails': '1'
      }),
    new ApiExample(
      'Open Food Facts Example',
      '',
      '',
      'GET',
      'https://world.openfoodfacts.org/api/v0/product/',
      false,
      false,
      false,
      false,
      true,
      '737628064502.json'
    ),
    new ApiExample(
      'Internet archive availability',
      '',
      '',
      'GET',
      'https://archive.org/wayback/available',
      {
        'url': 'google.com',
      }
    )
  ];

  constructor() {
    super();
  }


  loadExampleApi(example: ApiExample) {
    if (confirm('Load ' + example.name + '. Caution! Your own API configuration will be lost')) {
      this.reset(true);
      this.url = example.url;
      this.addSuffix = example.addSuffix || false;
      this.urlSuffix = example.urlSuffix;
      this.method = example.method;
      this.attributes = example.attributes;
      this.attributeValue = example.attributeValue;
      this.sendCustomAttributes = example.sendCustomAttributes;
      this.sendKey = example.sendKey || false;
      this.slashSeparator = example.slashSeparator || false;
      this.sendKeyAsBearer = example.sendKeyAsBearer || false;
      this.attributesAsBody = example.attributesAsBody || false;
      this.saveSession();
    }
  }

  getSearchUrl(url = this.url, sendCustomAttributes = this.sendCustomAttributes, attributes = this.attributes, attributesValue = this.attributeValue): string {
    let searchUrl = url || '';
    const questionMark = '?';
    const equalChar = '=';
    if (searchUrl && searchUrl.length >= this.urlMinLength) {
      if (this.method === 'GET') {


        let separator = questionMark;
        let equalSeparator = equalChar;
        if (this.slashSeparator) {
          separator = '';
          equalSeparator = '/';
        }
        if (sendCustomAttributes && attributes?.length) {
          for (const attributeName of attributes) {
            if (attributesValue[attributeName] && attributesValue[attributeName].length >= this.attributeMinLength) {
              searchUrl += separator + encodeURIComponent(attributeName) + equalSeparator + encodeURIComponent(attributesValue[attributeName]);
              if (this.slashSeparator) {
                separator = '/';
              } else {
                separator = '&';
              }
            }
          }
        }

        if (this.sendKey && this.keyAttribute?.length && this.key?.length && !this.sendKeyAsBearer) {
          if (this.slashSeparator) {
            searchUrl += questionMark;
          } else {
            searchUrl += separator;
          }
          searchUrl += encodeURIComponent(this.keyAttribute) + '=' + encodeURIComponent(this.key);
        }

      } else {

        let separator = '';

        if (sendCustomAttributes && attributes?.length && !this.attributesAsBody) {
          for (const attributeName of attributes) {
            if (attributesValue[attributeName] && attributesValue[attributeName].length >= this.attributeMinLength) {
              searchUrl += separator + encodeURIComponent(attributeName) + separator + encodeURIComponent(attributesValue[attributeName]);
              separator = '/';
            }
          }
        }

        if (this.sendKey && this.keyAttribute?.length && this.key?.length && !this.sendKeyAsBearer) {
          if (this.slashSeparator) {
            searchUrl += questionMark;
          } else {
            searchUrl += separator;
          }
          searchUrl += encodeURIComponent(this.keyAttribute) + '=' + encodeURIComponent(this.key);
        }

      }

    }

    if (this.addSuffix && this.urlSuffix) {
      searchUrl += this.urlSuffix;
    }
    return searchUrl;
  }

  newSearch(url = this.url, sendCustomAttributes = this.sendCustomAttributes, attributes = this.attributes) {
    const searchUrl = this.getSearchUrl(url, sendCustomAttributes, attributes);
    if (url && searchUrl) {
      const newSearch = new ApiSearch(this);
      newSearch.on('loaded', () => {
        if (newSearch.result.data && newSearch.result.data.length === 1) {
          this.selectResultData(newSearch.result.data[0]);
        }
      });

      this.searches.push(newSearch);
      this.selectSearch(newSearch);

      this.searches = this.sortData(this.searches, 'id', true);
      this.do('show-tab', 'result');
    }
  }


  setMappingAttributes(mappingAttributes = this.mappingAttributes) {
    this.mappingAttributes = mappingAttributes;
    this.mappingAttributesDataArray = [];
    if (this.mappingAttributes?.length) {
      this.availableMappingAttributes = this.mappingAttributes.filter(mappingAttribute => {
        for (const key in this.attributeMapping) {
          if (this.attributeMapping[key] && this.attributeMapping[key].attribute === mappingAttribute) {
            this.mappingAttributesDataArray.push(this.attributeMapping[key]);
            return false;
          }
        }
        return true;
      });
    }
  }

  reset(force = false) {
    if (force || confirm('Reset API data?')) {
      this.sendCustomAttributes = false;
      this.sendKey = false;
      this.keyAttribute = 'key';
      this.url = undefined;
      this.key = undefined;
      this.attributes = [];
      this.attributeValue = {};
      this.resetSession();
    }
  }

  inputChange(e: any = undefined) {
    if (this.sendKeyAsBearer && this.keyAttribute) {
      this.keyAttribute = 'realm';
    }
    this.saveSession();
  }

  addAttributeMapping(key: string, resultKeyMap: string[], attribute = this.selectedMappingAttribute) {
    if (attribute) {
      this.attributeMapping[key] = {key, keyMap: resultKeyMap, attribute: attribute};
      this.selectedMappingAttribute = undefined;
      this.updateSession();
      this.saveSession();
    }
  }

  removeAttributeMapping(key: string) {
    this.attributeMapping[key] = undefined;
    this.updateSession();
  }

  addAttribute(newAttributeName = this.newAttributeName, newAttributeValue = this.newAttributeValue) {
    if (newAttributeName) {
      this.attributes.push(newAttributeName);
      this.initAttributeValue(newAttributeName);
      if (newAttributeValue) {
        this.attributeValue[newAttributeName] = newAttributeValue;
      }
      this.saveSession();
      this.newAttributeName = undefined;
      this.newAttributeValue = undefined;
    }
  }

  removeAttribute(name: string) {
    for (let i = 0; 0 < this.attributes.length; i++) {
      if (name === this.attributes[i]) {
        this.attributes.splice(i, 1);
        this.saveSession();
        return;
      }
    }
  }

  initAttributeValue(newAttributeName = this.newAttributeName) {
    if (newAttributeName && !this.attributeValue[newAttributeName]) {
      this.attributeValue[newAttributeName] = undefined;
    }
  }

  attributeValidationError(newAttributeName = this.newAttributeName) {
    if (!newAttributeName) {
      return 'Type Attribute Name';
    } else if (newAttributeName.length < this.attributeMinLength) {
      return 'Type at least ' + this.attributeMinLength + ' characters';
    }
    for (const attributeName of this.attributes) {
      if (attributeName === newAttributeName) {
        return 'Attribute already exist';
      }
    }
    return false;
  }

  urlValidationError(url = this.url) {
    if (!url) {
      return 'Type URL';
    } else if (url.length < this.urlMinLength) {
      return 'Type at least ' + this.urlMinLength + ' characters';
    }
    return false;
  }

  selectSearch(apiSearch: ApiSearch) {
    this.search = apiSearch;
  }

  selectResultData(resultData: any) {
    this.resultData = resultData;
  }

  updateSession() {
    this.initAttributeValue();
    this.setMappingAttributes();
  }

}
