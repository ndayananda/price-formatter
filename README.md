<h1 align="center">
	Price Formatter (Currency Formatter)
</h1>
<p align="center">The Price Formatter library is exported as a CommonJS/ESM/Modern/UMD module.</p>

---

<p align="center">
  <strong>Guide → </strong>
  <a href="#features">Features</a> ✯
  <a href="#installation">Installation</a> ✯
  <a href="#Pattern">Pattern</a> ✯
  <a href="#usage">Usage</a>
</p>

---

## ✨ Features <a name="features"></a>
- **One dependency** to convert float value representing price by providing pattern.
- Customize price by different patterns
- Use same pattern to format the price throught the application
- Generic pattern with flexibility to use currency symbol/code, optional decimal

## 🔧 Installation <a name="installation"></a>

1️⃣ **Install** by running: `npm i --save price-formatter`

## 📦 Pattern <a name="Pattern"></a>
```js
// Starts with Currency
{cCUR }{n-}#{t,}##{t,}###{t,}##{t,}##(t,}###{d.}##

// Ends with Currency
{n-}#{t,}##{t,}###{t,}##{t,}##(t,}###{d.}##{c CUR}

// Starts with Currency
// optional decimals separator means that in case the float does not contain any decimals, don't show decimals
{cCUR }{n-}#{t,}##{t,}###{t,}##{t,}##(t,}###{o.}##
```

### Explanation of components in pattern:
- “{cCUR }” = currency code (e.g. “{cEUR }” or “{cUSD }”) or currency symbol (e.g. “{c €}” or “{c$ }”);
- “{n-}” = negative value indicator (“n”) and character(s) to be used to indicate negative value. Example: “-” ;
Note: the negative value indicator should only be used in case the float contains a negative value!
- “#########” = to be replaced by the Float value;
`Note:` the number signs between “{n?}” and “{d?}” or “{o?}” needs to be used for major part of the float (150 in case float contains 150.01) and the number signs after “{d?}” or “{o?}” needs to be used for minor part of the float (01 in case float contains 150.01)!
- “{t,}” = thousands separator (“t”) and character to be used to indicate the separator (“,”).
`Examples:` “ ” (space), “,” (comma), “.” (dot) or “’” (apostrophe);
`Note:` the pattern can contain multiple thousands separators!
- “{d.}” = decimals separator (“d”) and character to be used to indicate the separator (“.”).
`Examples:` “,” (comma) or “.” (dot);
`Note 1:` the pattern can contain only one decimals separators!
`Note 2:` in case “{d?}” is being used and there are no decimals in the float, the number signs for the decimals needs to be replaced with zero’s (0)!
`Note 3:` in case “{d?}” is being used and there are less decimals in the float as there are available number signs for decimals in the pattern, the remaining number signs for the decimals needs to be replaced with zero’s (0)!
`Note 4:` in case “{d?}” is being used and there are more decimals in the float as there are
available number signs for decimals in the pattern, the float needs to be rounded!
- “{o.}” = optional decimals separator (“o”) and character to be used to indicate the separator (“.”).
`Examples:` “,” (comma) or “.” (dot). The optional decimals separator means that in case the float does not contain any decimals, the decimals including the decimals separator should not be shown;
`Note 1:` in case “{o?}” is being used and there are less decimals in the float as there are available number signs for decimals in the pattern, the remaining number signs for the decimals needs to be replaced with zero’s (0)!
`Note 2:` in case “{o?}” is being used and there are more decimals in the float as there are available number signs for decimals in the pattern, the float needs to be rounded!


## 📦 Usage <a name="usage"></a>

```js
import PriceFormatter from './price-formatter.module.js';

const pattern = "{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##",
	formatter = new PriceFormatter(pattern);
	formatter.format('9876543210.1234');

output: € 9.876.543.210,12
```

## 🥂 License

[MIT](https://oss.ninja/mit/developit/)