import { getFormatOptions, getEncodePattern, format } from './formatter';

export default function PriceFormatter(pattern) {
  const formatedPattern = pattern.replace(/(\{c.*?\})/gi, '!').replace(/(\{n.*?\})/gi, '^').replace(/(\{[d|o].*?\})/gi, '.').replace(/(\{.*?\})/gi, ','),
    options = getFormatOptions(pattern),
    encodePattern = getEncodePattern(formatedPattern);

    Object.assign(encodePattern, options);

    return {
      format: function(value) {
        if (isNaN(value)) {
          throw new TypeError(`${value} is NaN`);
        }
        return format(Number(value), encodePattern);
      }
    }
}