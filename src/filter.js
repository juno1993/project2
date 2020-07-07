var numeral = require('numeral');

export function currency(num) {
  return currencyNum(num) + '원';
}

export function currencyWon(num) {
  num = parseInt(num);
  return '₩' + numeral(num).format('0,0');
}

export function currencyNum(num) {
  num = parseInt(num);
  return numeral(num).format('0,0');
}

export function currencyKor(num) {
  num = parseInt(num);
  if(num >= 10000 && (num % 10000 === 0)) {
    num = (num / 10000)
    return numeral(num).format('0,0') + '만원';
  }
  else {
    return numeral(num).format('0,0') + '원';
  }
}

export function thousand(num) {
  num = parseInt(num);
  if(num > 1000)
    return numeral(num).format('0.0a');
  else
    return numeral(num).format('0a');
}
