class ArrayTracker {
  _idIncrement: number
  _target: any
  _shell: Array<number>
  _changes: any
  _callback: (handler: ArrayTracker, property: string) => void

  constructor(target: Array<any>, callback: (handler: ArrayTracker, property: string) => void) {
    this._target = target;
    this._callback = callback;
    this._shell = [];
    this.clearChanges();

    for(this._idIncrement = 0; this._idIncrement < target.length; this._idIncrement++) {
      this._shell.push(this._idIncrement);
    }
  }

  clearChanges() {
    this._changes = {};
  }

  get(target: any, property: string, receiver: any) {
    switch(property) {
      case 'push': 
        return this._push.bind(this);
      default:
        return this._target[property];
    }
  }

  _push(...pushes: Array<any>) {
    for(var i = 0; i < pushes.length; i++) {
      this._shell.push(++this._idIncrement);
    }
    var result = this._target.push.apply(this._target, pushes);
    this._callback(this, "");

    return result;
  }
  _pop() {

  }
}

export default ArrayTracker;
