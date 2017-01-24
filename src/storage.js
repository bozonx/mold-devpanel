import localStorage from 'localStorage';

class Storage {
  constructor() {
    this._prefix = 'mold-devpanel__';
  }

  get(param) {
    return JSON.parse(localStorage.getItem(this._prefix + param));
  }

  set(param, data) {
    return localStorage.setItem(this._prefix + param, data);
  }
}

export default new Storage();
