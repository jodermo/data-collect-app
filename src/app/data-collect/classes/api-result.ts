import { ApiSearch } from './api-search';

export class ApiResultError {
  constructor(public code = 500, public message = 'error', public logInConsole = false) {
    if (this.logInConsole) {
      console.error(this);
    }
  }
}

export class ApiResult {
  url?: string;
  data?: any;
  selectedData: any = {};
  dataType?: string;
  error?: ApiResultError;
  date?: any;
  loading = true;

  constructor(apiSearch: ApiSearch) {
    this.url = apiSearch.url;
  }

  setResult(resultData: any) {
    this.data = resultData;
    this.selectedData = {};
    for (let i = 0; i < this.data.length; i++) {
      this.selectedData[i] = true;
    }
    this.selectAll();
    this.loading = false;
  }

  selected() {
    let selected = 0;
    for (const key in this.selectedData) {
      if (this.selectedData[key]) {
        selected++;
      }
    }
    return selected;
  }

  allSelected() {
    for (const key in this.selectedData) {
      if (!this.selectedData[key]) {
        return false;
      }
    }
    return true;
  }

  selectAll() {
    for (const key in this.selectedData) {
      this.selectedData[key] = true;
    }
  }

  unSelectAll() {
    for (const key in this.selectedData) {
      this.selectedData[key] = false;
    }
  }

  toggleSelectAll() {
    if (this.allSelected()) {
      this.unSelectAll();
    } else {
      this.selectAll();
    }
  }

  setError(code = 500, message = 'error', logInConsole = false) {
    this.error = new ApiResultError(code, message, logInConsole);
  }
}
