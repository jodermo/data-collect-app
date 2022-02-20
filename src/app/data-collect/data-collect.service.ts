import { Injectable } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormControl } from '@angular/forms';
import { ApiSearch } from './classes/api-search';
import { LoadSaveDo } from './classes/load-save-do';

@Injectable({
  providedIn: 'root'
})
export class DataCollectService extends LoadSaveDo {


  appTitle = 'CSV Data';
  appSlogan = 'Get Your Data Together!';
  appDescription = 'Create, upload, download, manage CSV data and search for data in online APIs';
  configFileExtension = '.dcaconf';

  started = false;

  newColumnName?: string;
  columns: string[] = [];
  newRow: any = {};
  rows: any[] = [];

  selectedColumn?: string;
  selectedRow?: any;

  columnNameMinLength = 3;
  csvSeparators = [';', ','];
  csvSeparator = this.csvSeparators[0];

  configSeparatorColumn = '~C~';
  configSeparatorRow = '~R~';


  tabs = [
    {
      name: 'data',
      label: 'CSV Editor',
      component: 'data-table-editor'
    },
    {
      name: 'search',
      label: 'API Search',
      component: 'api-search'
    },
    {
      name: 'result',
      label: 'API Result',
      component: 'api-result',
      available: () => {
        return (this.api.searches?.length > 0)
      }
    },
    {
      name: 'mapping',
      label: 'Result Mapping',
      component: 'api-result-mapping',
      available: () => {
        return (this.api.searches?.length > 0 && this.api.mappingAttributesDataArray && this.api.mappingAttributesDataArray.length > 0)
      }
    }
  ];
  availableTabs = () => {
    return this.tabs.filter(tab => {
      if (tab.available) {
        return tab.available();
      }
      return true;
    })
  };
  selectedTab = new FormControl(0);
  canSave = false;
  storedSession = false;

  saveAttributes = [
    {name: 'data-collect-rows', valueKey: 'rows', json: true},
    {name: 'data-collect-columns', valueKey: 'columns', json: true},
  ];

  constructor(public api: ApiService) {
    super();
    this.api.on('show-tab', (tabName: string) => {
      this.selectTabByName(tabName);
    });
    this.api.on('save', (data: any) => {
      this.saveValue(data.key, data.value);
    });
    this.api.on('reset', (data: any) => {
      this.resetValue(data.key);
    });
    this.api.on('data-loaded', (data: any) => {
      this.storedSession = true;
    });
    this.api.on('config-json-loaded', (data: any) => {
      this.started = true;
    });
    this.on('save', (data: any) => {
      this.saveValue(data.key, data.value);
    });
    this.on('reset', (data: any) => {
      this.resetValue(data.key);
    });
    this.on('data-loaded', (data: any) => {
      this.storedSession = true;
    });
    this.on('config-json-loaded', (data: any) => {
      this.started = true;
    });
  }


  start(newSession = false) {
    if (newSession) {
      if (!this.storedSession || confirm('caution! your last session will be lost.')) {
        this.reset(true, true);
        this.started = true;
      }
    } else {
      this.started = true;
    }

  }

  selectTabByName(name: string) {
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].name === name) {
        return this.selectTabByIndex(i);
      }
    }
  }

  selectTabByIndex(index: number) {
    this.selectedTab.setValue(index);
  }

  reset(restApi = false, force = false) {
    let confirmMessage = 'Reset table data?';
    if (restApi) {
      confirmMessage = 'Reset all data?'
    }
    if (force || confirm(confirmMessage)) {
      this.newColumnName = undefined;
      this.newRow = {};
      this.columns = [];
      this.rows = [];
      this.resetSession();
      if (restApi) {
        this.api.reset(true);
      }
    }

  }

  columnNameValidationError(newColumnName = this.newColumnName) {
    if (!newColumnName) {
      return 'Type column name';
    } else if (newColumnName.length < this.columnNameMinLength) {
      return 'Type at least ' + this.columnNameMinLength + ' characters';
    }
    for (const columnName of this.columns) {
      if (columnName === newColumnName) {
        return 'Column already exist';
      }
    }
    return false;
  }

  addNewColumn(columnName = this.newColumnName) {
    if (columnName && columnName.length) {
      let existing = false;
      for (const existingName of this.columns) {
        if (existingName === columnName) {
          existing = true;
        }
      }
      if (!existing) {
        this.columns.push(columnName);
      }
      this.newColumnName = undefined;
      this.initNewRowData();
      this.saveSession();
    }
  }

  addNewRow(row = this.newRow) {
    this.rows.push(row);
    this.initNewRowData();
    this.saveSession();
  }

  initNewRowData() {
    this.api.setMappingAttributes(this.columns);
    this.newRow = {};
    for (const columnName of this.columns) {
      this.newRow[columnName] = '';
      for (const row of this.rows) {
        if (!row[columnName]) {
          row[columnName] = '';
        }
      }
    }
    if (this.columns) {
      this.canSave = true;
    } else {
      this.canSave = false;
    }
  }

  downloadCSV() {

    const csvRows = [
      this.columns
    ];
    for (const row of this.rows) {
      const csvRow = [];
      for (const columnName of this.columns) {
        csvRow.push(row[columnName]);
      }
      csvRows.push(csvRow);
    }
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(this.csvSeparator)).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'my_data.csv');
    link.style.opacity = '0';
    link.style.position = 'absolute';
    link.style.pointerEvents = 'none';
    document.body.appendChild(link); // Required for FF
    link.click();
    setTimeout(() => {
      link.remove();
    }, 0);
  }


  downloadConfigFile() {
    if (this.saveData) {
      const keys = Object.keys(this.saveData);
      const rows = [
        keys
      ];
      const csvRow = [];
      for (const key of keys) {
        csvRow.push(this.saveData[key]);
      }
      rows.push(csvRow);

      const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(this.configSeparatorColumn)).join(this.configSeparatorRow);
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'csv_data_manager_configuration' + Date.now() + this.configFileExtension);
      link.style.opacity = '0';
      link.style.position = 'absolute';
      link.style.pointerEvents = 'none';
      document.body.appendChild(link); // Required for FF
      link.click();
      setTimeout(() => {
        link.remove();
      }, 0);
    }


  }


  removeColumn(name: string) {
    for (let i = 0; i < this.columns.length; i++) {
      if (name === this.columns[i]) {
        this.columns.splice(i, 1);
        this.saveSession();
        return;
      }
    }
  }

  removeRow(row: any) {
    for (let i = 0; i < this.rows.length; i++) {
      if (row === this.rows[i]) {
        this.rows.splice(i, 1);
        this.saveSession();
        return;
      }
    }
  }

  fileUploadChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const text = reader.result;
        const csvToJson = this.csvJSON(text);
        this.setJsonAttributes(csvToJson);
      }
    }
  }

  configUploadChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const text = reader.result;
        const confToJson = this.configJSON(text);
        this.loadConfigJSON(confToJson);
      }
    }
  }

  csvJSON(csvText: any) {
    const lines: any[] = [];
    const linesArray = csvText.split('\n');
    linesArray.forEach((e: any) => {
      const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, this.csvSeparator).trim();
      lines.push(row);
    });
    lines.splice(lines.length - 1, 1);
    const result = [];
    const headers = lines[0].split(this.csvSeparator);
    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentline = lines[i].split(this.csvSeparator);

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }

  configJSON(csvText: any) {
    const lines: any[] = [];
    const linesArray = csvText.split(this.configSeparatorRow);
    linesArray.forEach((e: any) => {
      // const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, this.configSeparatorColumn).trim();
      lines.push(e);
    });

    //  lines.splice(lines.length - 1, 1);
    const result = [];
    const headers = lines[0].split(this.configSeparatorColumn);
    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentline = lines[i].split(this.configSeparatorColumn);
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    const data: any = {};
    if (result.length) {
      for (const key in result[0]) {
        try {
          data[key] = JSON.parse(result[0][key]);
        } catch (e) {
          data[key] = result[0][key];
        }
      }
    }
    return data;
  }

  loadConfigJSON(confJson: any) {
    super.loadConfigJSON(confJson);
    this.api.loadConfigJSON(confJson);
  }

  setJsonAttributes(data: any) {
    this.columns = [];
    this.rows = [];
    for (const entry of data) {
      for (const key in entry) {
        if (!this.columnNameValidationError(key)) {
          this.addNewColumn(key);
        }
      }
      this.addNewRow(entry);
    }
    this.selectTabByName('data');
    this.started = true;

  }

  importApiResult(apiSearch: ApiSearch) {
    if (apiSearch.result?.data) {
      for (let i = 0; i < apiSearch.result.data.length; i++) {
        if (apiSearch.result.selectedData[i]) {
          const data = apiSearch.result.data[i];
          const newRow: any = {};
          let mappingExist = false;
          if (this.api.mappingAttributesDataArray) {
            for (const mapping of this.api.mappingAttributesDataArray) {
              for (const columnName of this.columns) {
                if (mapping.attribute === columnName && data) {
                  newRow[columnName] = this.parseKeyMapData(data, mapping.keyMap, mapping.key);
                  mappingExist = true;
                }
              }
            }
          }
          if (mappingExist) {
            for (const columnName of this.columns) {
              if (!newRow[columnName]) {
                newRow[columnName] = '';
              }
            }
            this.addNewRow(newRow);
          }
        }
      }
      this.selectTabByName('data');
      this.started = true;
    }
  }

  parseKeyMapData(data: any, keyMap?: string[], resultKey?: string): any {
    const keyMapArray: string[] = [];
    if (keyMap) {
      for (const key of keyMap) {
        keyMapArray.push(key);
      }
    }
    if (keyMapArray.length) {
      const key = keyMapArray[0];
      keyMapArray.splice(0, 1);
      if (data[key]) {
        data = data[key];
        if (keyMapArray.length) {
          return this.parseKeyMapData(data, keyMapArray);
        }
      } else {
        return undefined;
      }
    }
    if (resultKey && data[resultKey]) {
      data = data[resultKey];
    }
    if (typeof data === 'object') {
      return data;
    }
    return data;
  }

  updateSession() {
    this.initNewRowData();
  }


  isMapped(entryName: string, parentKey?: string, parentKeyMap?: any): any {
    const mapping = this.api.attributeMapping[entryName];
    if (mapping && mapping.attribute) {
      if (mapping.keyMap) {
        if (parentKeyMap) {
          for (const key of mapping.keyMap) {
            let parentExist = false;
            for (const parentKey of parentKeyMap) {
              if (parentKey === key) {
                parentExist = true;
              }
            }
            if (!parentExist) {
              return false;
            }
          }
        }
      }
      return mapping.attribute;
    }
    return false;
  }
}
