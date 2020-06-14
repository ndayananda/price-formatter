/**
 *	toFixed method returns the number fixed to precession decimal value
 *
 * @param {Number} number
 * @param {Number} precision
 * @access public
 * @returns {Number} returns the number fixed to passed precission
 */
function toFixed(number, precision) {
  return Number(number).toFixed(precision);
}

/**
 *	encodePattern method encodes the pattern provided by replacing
 * currency with !, negetive with ^, decimal/optional with ., thousand separator with ,
 * and returns encodedPattern
 *
 * @param {String} pattern, pattern to be used to format the value
 * @returns {String} encodedPattern, like ^#,###,###,###.##!
 */
function encodePattern(pattern) {
  return pattern.replace(/(\{c.*?\})/gi, '!').replace(/(\{n.*?\})/gi, '^').replace(/(\{[d|o].*?\})/gi, '.').replace(/(\{.*?\})/gi, ',')
}

/**
 *	decodePattern method is recursive function which decodeds the pattern provided and
 * returns format parameters like symbol, negetive, decimal, isDecimalOptional, group
 *
 * @param {String} pattern, pattern to be used to format the value
 * @returns {Object} params, parameters like symbol, negetive, decimal, isDecimalOptional, group
 */
function decodePattern(pattern, params = {}, regex = /(\{([c|n|t|o|d])(.*?)\})/gi, matches = regex.exec(pattern)) {
  if(!matches) return params;

  const map = { c: 'symbol', n: 'negative', d: 'decimal', o: 'decimal', t: 'group'};

  params[map[matches[2].toLowerCase()]] = matches[3];

  if(matches[2].toLowerCase() === 'o') params['isDecimalOptional'] = true;

  return decodePattern(pattern, params, regex, matches = regex.exec(pattern));
}

/**
 *	getFormatOptions method returns a few simple characteristics of the pattern provided
 *
 * @param {String} pattern, pattern to be used to format the value
 * @returns {Object} returns an object with values for pattern, decimalPlaces, leftSpacing, groups, spacing
 */
function getFormatOptions(pattern) {
  const params = decodePattern(pattern),
    encodedPattern = encodePattern(pattern),
    numberFormatPattern = encodedPattern.trim().match(/[#0,.]+/)[0],
    split = numberFormatPattern.split('.'),
    decimalChars = split[0],
    decimalMantissa = split[1],
    groups = decimalChars.split(','),
    spacing = encodedPattern.split(numberFormatPattern);

  return Object.assign({}, {
    pattern: encodedPattern,
    decimalPlaces: typeof decimalMantissa === 'undefined' ? 0 : decimalMantissa.length,
    leftSpacing: spacing[0],
    rightSpacing: spacing[1],
    groupLengths: groups.map((group) => {
      return group.length;
    })
  }, params);
}

/**
 *	formatDecimalChars method returns formatted Decimal Charecters w.r.t pattern
 *
 * @param {Object} formatOptions, the options to format decimal chars
 * @param {Array} formatOptions.groupLengths, array of decimal char groups like [1,3,3,3]
 * @param {String} formatOptions.separator, decimal char separator
 * @param {String} formatOptions.number, decimal chars number to be formatted
 * @returns {Object} {num, formattedNumber}
 */
function formatDecimalChars({groupLengths = [], separator = ',', number = '0'}) {
  return [...groupLengths].reverse().reduce(({num, formattedNumber}, curr) => {
      return {
        num: num.substring(0, num.length - curr),
        formattedNumber: num.substring(num.length - curr).length ? (formattedNumber.length ? `${num.substring(num.length - curr)}${separator}${formattedNumber}` : `${num.substring(num.length - curr)}`) : formattedNumber
      };
  }, {num: number, formattedNumber: ''});
}

/**
 *	formatDecimalMantissa method returns formatted Decimal Mantissa w.r.t pattern
 *
 * @param {Number} inputValue, inputValue to be formatted
 * @param {String} number, Decimal Mantissa
 * @param {Object} options, the options to format decimal mantissa
 * @returns {String} formatDecimalMantissa
 */
function formatDecimalMantissa(inputValue, number, options) {
  return typeof number === 'undefined' || (options.isDecimalOptional && Number.isInteger(inputValue)) ? '' : `${options.decimal}${number}`;
}

/**
 *	format method returns formattedNumber w.r.t pattern
 *
 * @param {Number} number
 * @param {Object} options
 * @returns {String} formattedNumber
 */
function format(number, options) {
  const formattedValue = toFixed(Math.abs(number), options.decimalPlaces),
    splitNumber = formattedValue.split('.');

  let {formattedNumber} = formatDecimalChars({groupLengths: options.groupLengths, separator: options.group, number: splitNumber[0]});

  formattedNumber = `${options.leftSpacing}${formattedNumber}${formatDecimalMantissa(number, splitNumber[1], options)}${options.rightSpacing}`;

  return formattedNumber
    .replace(/\^/g, number < 0 ? options.negative || '-' : '')
    .replace(/!/g, options.symbol)
    .trim()
    .replace(/\s/g, ' '); // Replacing space with the non breaking space ASCII code (alt+255), this makes price & currency symbol a single word without break
}

export function getPriceFormatter(pattern) {
  const formatOptions = getFormatOptions(pattern);
  return (value) => format(value, formatOptions);
}