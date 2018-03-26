const util = {
  // 创建uuid
  uuid: () => {
    /*jshint bitwise:false */
    let i, random;
    let uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? ((random & 3) | 8) : random)).toString(16);
    }

    return uuid;
  },
  /**
   * localStorage 保存数据
   */
  store: (namespace, data) => {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
  },
  /**
   * 清除Storage数据
   */
  clearStore: (namespace) => {
    localStorage.removeItem(namespace);
  },
  pluralize: (count, word) => {
    return count === 1 ? word : word + 's';
  }
}

export default class Toolkit {
  static get util () {
    return util;
  }
}