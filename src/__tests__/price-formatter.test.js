import PriceFormatter from './../index.js';

const pattern = "{n-}#{t,}###{t,}###{t,}###{t,}###{o.}###{c ﷼}";

let formatter = '';

beforeAll(() => {
  formatter = new PriceFormatter(pattern);
})

describe('Test Price Formatter', () => {
  it('should create an instance of price formatter for the provided pattern', () => {
    expect(formatter).toBeInstanceOf(PriceFormatter);
  });

  it('should return the pattern', () => {
    expect(formatter.getPattern()).toBe(pattern);
  });
});

describe('Test format method', () => {
  it('should throw error NaN while invoking format method without passing any value', () => {
    expect(() => formatter.format()).toThrowError('is NaN');
  });

  it('should throw error NaN while invoking format method if the value is NaN', () => {
    expect(() => formatter.format('test123')).toThrowError('is NaN');
  });

  it('should not throw error NaN while invoking format method if the value is a number', () => {
    expect(() => formatter.format('123')).not.toThrowError('is NaN');
  });

  it('should not throw error NaN while invoking format method if the value is a number', () => {
    expect(() => formatter.format(123)).not.toThrowError('is NaN');
  });

  it('should return the proper formatted price as per the pattern', () => {
    expect(formatter.format('10')).toBe('10 ﷼');
  });

  it.each([
    ["{n-}#{t,}###{t,}###{t,}###{t,}###{o.}###{c ﷼}","10","10 ﷼"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","13.50","€ 13,50"],
    ["{cEUR }{n-}#{t.}###{t.}###{t.}###{d,}##","45.054","EUR 45,05"],
    ["{n-}#{t.}###{t.}###{t.}###{d,}##{c EUR}","-145","-145,00 EUR"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","201.34","€ 201,34"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","187.300006","€ 187,30"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","1401","€ 1.401,00"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","1199.1","€ 1.199,10"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","-2002.123","€ -2.002,12"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","12500","€ 12.500,00"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","22500.34","€ 22.500,34"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","65743.678","€ 65.743,68"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","545221","€ 545.221,00"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","-132333.98","€ -132.333,98"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{d,}##","9876543210.1234","€ 9.876.543.210,12"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","10","€ 10"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","13.50","€ 13,50"],
    ["{cEUR }{n-}#{t.}###{t.}###{t.}###{o,}##","45.054","EUR 45,05"],
    ["{n-}#{t.}###{t.}###{t.}###{o,}##{c EUR}","-145","-145 EUR"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","201.34","€ 201,34"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","187.300006","€ 187,30"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","1401","€ 1.401"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","1199.1","€ 1.199,10"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","-2002.123","€ -2.002,12"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","12500","€ 12.500"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","22500.34","€ 22.500,34"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","65743.678","€ 65.743,68"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","545221","€ 545.221"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","-132333.98","€ -132.333,98"],
    ["{c€ }{n-}#{t.}###{t.}###{t.}###{o,}##","9876543210.1234","€ 9.876.543.210,12"]
  ])('when %s pattern is used to format %s then it will return %s', (pricePattern, value, expected) => {
    const priceFormatter = new PriceFormatter(pricePattern);
    expect(priceFormatter.format(value)).toBe(expected);
  });
});