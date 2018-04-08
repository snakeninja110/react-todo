// const EventEmitter = require('events').EventEmitter;

// 自定义事件 类似 nodejs中的 EventEmitter
class EventEmitter {
  constructor () {
    this._events = {}
  }
  /**
   * 触发事件
   * @param {String} event 事件名称
   * @param {*} args 参数
   * @returns {EventEmitter}
   */
  emit (event, ...args) {
    let es = this._events && (this._events[event] || []);
    let rv = [];
    if (es.length) {
      for (let i = 0; i < es.length; i++) {
        rv.push(es[i].apply(this, args))
      }
    }
    return this;
  }

  /**
   * 绑定事件
   * @param {String} event 事件名称
   * @param {Function} callback 事件方法
   * @returns {EventEmitter}
   */
  on (event, callback) {
    let events = this._events || (this._events = {});
    events[event] || (events[event] = []);
    events[event].push(callback);
    return this;
  }

  /**
   * 移除事件
   * @param {String} event 事件名称
   * @param {Function} callback 事件方法
   * @returns {EventEmitter}
   */
  off (event, callback) {
    let events = this._events;
    if (events) {
      if (callback) {
        let es = events[event];
        if (es) {
          let index = es.indexOf(callback);
          if (index > -1) {
            es.splice(index, 1);
          }
        }
      } else if (event) {
        delete events[event];
      } else {
        delete this._events;
      }
    }
    return this;
  }

}

const EventBus = new EventEmitter();
export default EventBus;
