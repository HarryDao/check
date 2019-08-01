exports.store = (a) => {
  return a.reduce((text, obj) => {
    for (let key in obj) {
      text += `${key}=${obj[key]};`;
    }
    return text.slice(0, -1) + '\n';
  }, '');
};

exports.load = (text) => {
  const arr = [];
  let obj = {};
  let key = null;
  let value = null;
  let read = '';

  for (let chr of text) {
    if (chr === '=') {
      key = read;
      read = '';
    }
    else if (chr === ';') {
      value = read;
      obj[key] = value;
      read = '';
      key = null;
      value = null;
    }
    else if (chr === '\n') {
      value = read;
      obj[key] = value;
      arr.push(obj);
      read = '';
      key = null;
      value = null;
      obj = {};
    }
    else {
      read += chr;
    }
  }

  return arr;
};