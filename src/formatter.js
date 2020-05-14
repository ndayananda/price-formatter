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
 *	getFormatOptions method returns format options from the pattern
 *
 * @param {String} pattern, pattern to be used to format the value
 * @returns {Object} options
 */
export function getFormatOptions(pattern) {
  let matches;
  const options = {},
    regex = /(\{([c|n|t|o|d])(.*?)\})/gi;

  while ((matches = regex.exec(pattern)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (matches.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    switch (matches[2].toLowerCase()) {
      case 'c':
        options['symbol'] = matches[3];
        break;
      case 'n':
        options['negative'] = matches[3];
        break;
      case 'd':
        options['decimal'] = matches[3];
        break;
      case 'o':
        options['decimal'] = matches[3];
        options['isDecimalOptional'] = true;
        break;
      case 't':
        options['group'] = matches[3];
        break;
      default:
        break;
    }
  }
  return options;
}

/**
 *	format method returns formattedNumber w.r.t pattern
 *
 * @param {Number} number
 * @param {Object} options
 * @returns {String} formattedNumber
 */
export function format(number, options) {
  const formattedValue = toFixed(Math.abs(number), options.decimalPlaces),
    splitNumber = formattedValue.split('.'),
    maxGroupIndex = options.groupLengths.length - 1;

  let segment = splitNumber[0],
    formattedNumber = '',
    decimalChars = splitNumber[0].length,
    groupIndex = maxGroupIndex,
    currentGroupLength;

  if (maxGroupIndex > 0) {
    while (decimalChars > 0) {
      groupIndex = groupIndex < 0 ? 0 : groupIndex;
      currentGroupLength = options.groupLengths[groupIndex];
      segment = `${splitNumber[0].substring(decimalChars - currentGroupLength, decimalChars)}${options.group}${segment}`;
      decimalChars -= currentGroupLength;
      --groupIndex;
    }
    segment = segment.substring(0, segment.length - 1);
  }

  formattedNumber = options.leftSpacing + segment;
  formattedNumber += typeof splitNumber[1] === 'undefined' || (options.isDecimalOptional && number % 1 === 0) ? '' : options.decimal + splitNumber[1];
  formattedNumber += options.rightSpacing;

  return formattedNumber
    .replace(/\^/g, number < 0 ? options.negative || '-' : '')
    .replace(/!/g, options.symbol)
    .trim()
    .replace(/\s/g, ' '); // Replacing space with the non breaking space ASCII code (alt+255), this makes price & currency symbol a single word without break
}

/**
 *	getEncodePattern method returns a few simple characteristics of the pattern provided
 *
 * @param {String} pattern, pattern to be used to format the value
 * @returns {Object} returns an object with values for pattern, decimalPlaces, leftSpacing, groups, spacing
 */
export function getEncodePattern(pattern) {
  const numberFormatPattern = pattern.trim().match(/[#0,.]+/)[0],
    split = numberFormatPattern.split('.'),
    decimalChars = split[0],
    decimalMantissa = split[1],
    groups = decimalChars.split(','),
    spacing = pattern.split(numberFormatPattern);

  return {
    pattern: pattern,
    decimalPlaces: typeof decimalMantissa === 'undefined' ? 0 : decimalMantissa.length,
    leftSpacing: spacing[0],
    rightSpacing: spacing[1],
    groupLengths: groups.map((group) => {
      return group.length;
    })
  };
}