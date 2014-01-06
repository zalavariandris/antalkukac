// Generated by CoffeeScript 1.6.3
(function() {
  var global;

  global = this;

  this.Observable = (function() {
    function Observable() {
      this._hash = new Object;
      this.__observers = {};
      this.init();
    }

    Observable.prototype.init = function() {};

    Observable.prototype.set = function(key, value) {
      var change;
      change = {
        added: [value],
        removed: [],
        old: value,
        "new": this._hash[key]
      };
      this._hash[key] = value;
      this.__fire(key, change);
      return this._hash[key];
    };

    Observable.prototype.get = function(key) {
      return this._hash[key];
    };

    Observable.prototype.addTo = function(key, value) {
      var change, oldArray;
      oldArray = this._hash[key].slice();
      this._hash[key].push(value);
      change = {
        added: [value],
        removed: [],
        old: oldArray,
        "new": this._hash[key]
      };
      this.__fire(key, change);
      return this._hash[key];
    };

    Observable.prototype.removeFrom = function(key, value) {
      var change, index, oldArray;
      oldArray = this._hash[key].slice();
      index = this._hash[key].indexOf(value);
      this._hash[key].splice(index, 1);
      change = {
        added: [],
        removed: [value],
        old: oldArray,
        "new": this._hash[key]
      };
      return this.__fire(key, change);
    };

    Observable.prototype.__fire = function(key, change) {
      var observer, observers, _i, _len, _results;
      if (!key) {
        throw new Error("Event Object needs type");
      }
      observers = this.__observers[key];
      if (observers) {
        _results = [];
        for (_i = 0, _len = observers.length; _i < _len; _i++) {
          observer = observers[_i];
          _results.push(observer.call(this, key, change));
        }
        return _results;
      }
    };

    Observable.prototype.addObserver = function(key, observer) {
      if (!this.__observers[key]) {
        this.__observers[key] = [];
      }
      return this.__observers[key].push(observer);
    };

    Observable.prototype.removeObservers = function(key) {
      var _ref;
      return (_ref = this.__observers[key]) != null ? _ref.length = 0 : void 0;
    };

    return Observable;

  })();

}).call(this);