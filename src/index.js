import { getPriceFormatter } from './formatter';

export default class PriceFormatter {
  constructor(pattern) {
    this.pattern = pattern;
    this.formatPrice = getPriceFormatter(pattern);
  }

  format(value) {
    if (isNaN(value)) {
      throw new TypeError(`${value} is NaN`);
    }
    return this.formatPrice(Number(value));
  }

  getPattern() {
    return this.pattern;
  }
}