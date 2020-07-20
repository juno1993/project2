import moment from 'moment'
import numeral from 'numeral'

function dateFormat(dateString, format) {
  let date = moment(dateString);
  return date.format(format);
}

/**
 * '32x16' string to object.
 * @param {string} sizeString  - A string formatted as '32x16'
 * @returns {Object} - { width: int, height: int }
 */
function parseSize(sizeString) {
  const arr = sizeString.split('x');
  let size = {
    width: parseInt(arr[0]),
    height: parseInt(arr[1])
  };
  return size;
}

/**
 * 't0-e-text' string to camel case string.
 * @param {string} str  - A string as 't0-e-text'
 * @returns {string} - 't0EText'
 */

function camelize(str) {
  return str.replace(/\W+(.)/g, function(match, chr)
  {
    return chr.toUpperCase();
  });
}

function camelToDash(str) {
  return str.replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
    .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)
}

// 문자열 모든 공백 제거
function removeStringSpace(str) {
  return str.replace(/(\s*)/g,'');
}

function currency(num) {
  return currencyNum(num) + '원';
}

function currencyWon(num) {
  num = parseInt(num);
  return '₩' + numeral(num).format('0,0');
}

function currencyNum(num) {
  num = parseInt(num);
  return numeral(num).format('0,0');
}

function currencyKor(num) {
  num = parseInt(num);
  if(num >= 10000 && (num % 10000 === 0)) {
    num = (num / 10000)
    return numeral(num).format('0,0') + '만원';
  }
  else {
    return numeral(num).format('0,0') + '원';
  }
}

function thousand(num) {
  num = parseInt(num);
  if(num > 1000)
    return numeral(num).format('0.0a');
  else
    return numeral(num).format('0a');
}

export {
  dateFormat,
  parseSize,
  camelize,
  camelToDash,
  removeStringSpace,
  currency,
  currencyWon,
  currencyNum,
  currencyKor,
  thousand
}
