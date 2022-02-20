export class LoadSaveDo {

  saveAttributes: any[] = [];
  saveData?: any;
  callbacks: any = {};

  constructor() {
    setTimeout(() => {
      this.loadLocalStorage();
    }, 0)
  }


  updateSession() {

  }


  resetSession() {
    for (const saveAttribute of this.saveAttributes) {
      this.do('reset', {key: saveAttribute.name});
    }
    this.resetLocalStorage();
  }


  saveSession() {
    for (const saveAttribute of this.saveAttributes) {
      if ((this as any)[saveAttribute.valueKey]) {
        let saveData = (this as any)[saveAttribute.valueKey];
        if (saveAttribute.json) {
          try {
            saveData = JSON.stringify(saveData);
          } catch (e) {
            saveData = saveData;
          }
        }
        this.do('save', {key: saveAttribute.name, value: (this as any)[saveAttribute.valueKey]});
      } else {
        this.do('reset', {key: saveAttribute.name});
      }
    }
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    for (const saveAttribute of this.saveAttributes) {
      if ((this as any)[saveAttribute.valueKey]) {
        let saveData = (this as any)[saveAttribute.valueKey];
        if (saveAttribute.json) {
          try {
            saveData = JSON.stringify(saveData);
          } catch (e) {
            saveData = saveData;
          }
        }
        localStorage.setItem(saveAttribute.name, saveData);
      } else {
        localStorage.removeItem(saveAttribute.name);
      }
    }
  }


  loadConfigJSON(confJson: any) {
    for (const saveAttribute of this.saveAttributes) {
      let savedData = confJson[saveAttribute.name];
      if (savedData) {
        if (saveAttribute.json) {
          try {
            savedData = JSON.parse(savedData);
          } catch (e) {
            savedData = savedData;
          }
        }
        (this as any)[saveAttribute.valueKey] = savedData;
        this.updateSession();
        this.saveSession();
        setTimeout(()=>{
          this.do('config-json-loaded', {key: saveAttribute.name, data: savedData});
        }, 0);
      }
    }

  }


  loadLocalStorage() {
    for (const saveAttribute of this.saveAttributes) {
      let savedData = localStorage.getItem(saveAttribute.name);
      if (savedData) {
        if (saveAttribute.json) {
          try {
            savedData = JSON.parse(savedData);
          } catch (e) {
            savedData = savedData;
          }
        }
        (this as any)[saveAttribute.valueKey] = savedData;
        this.saveValue(saveAttribute.valueKey, savedData)
        this.do('data-loaded', {key: saveAttribute.name, data: savedData});
      }
    }
    this.updateSession();
  }

  resetLocalStorage() {
    for (const saveAttribute of this.saveAttributes) {
      localStorage.removeItem(saveAttribute.name);
      this.do('removed', {key: saveAttribute.name});
    }
  }

  on(callbackName: string, callback: any) {
    if (!this.callbacks[callbackName]) {
      this.callbacks[callbackName] = [];
    }
    this.callbacks[callbackName].push(callback);
  }

  do(callbackName: string, callbackData?: any) {
    if (this.callbacks[callbackName]) {
      for (const callback of this.callbacks[callbackName]) {
        callback(callbackData);
      }
    }
  }


  parseDate(date: any) {
    return new Date(date).toLocaleDateString();
  }

  parseDateTime(date: any) {
    return new Date(date).toLocaleTimeString();
  }

  parseTime(timestamp: number) {
    return (timestamp / 1000) + 's';
  }

  saveValue(key: string, value: any) {
    if (!this.saveData) {
      this.saveData = {}
    }
    try {
      value = JSON.stringify(value);
    } catch (e) {
      value = value;
    }
    this.saveData[key] = value;
  }


  resetValue(key: string) {
    if (this.saveData) {
      const saveData = this.saveData;
      this.saveData = {};
      for (const saveDataKey in saveData) {
        if (saveDataKey !== key) {
          this.saveData[saveDataKey] = saveData[saveDataKey];
        }
      }
    }
  }

  sortData(data: any[], attr: string, reverse = false) {
    return data.sort((a, b) => {
      if (reverse) {
        return (b[attr] - a[attr]);
      } else {
        return (a[attr] - b[attr]);
      }

    });
  }

}
