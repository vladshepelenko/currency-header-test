import currencyUsd from '../images/currencyUsd.png';
import currencyEur from '../images/currencyEur.svg';
import currencyGbp from '../images/currencyGbp.png';
import currencyAud from '../images/currencyAud.png';
import currencyCad from '../images/currencyCad.png';

export enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  AUD = 'AUD',
  CAD = 'CAD',
}

export interface ICurrency {
  code: Currencies;
  title: Currencies;
  logo: string;
  isDefault: boolean;
  value: number;
}

export const GOLD_PRICE_IN_DEFAULT_CURRENCY = 10;

const currencies = [
  {
    code: Currencies.USD,
    title: Currencies.USD,
    logo: currencyUsd,
    isDefault: true,
    value: 1,
  },
  {
    code: Currencies.EUR,
    title: Currencies.EUR,
    logo: currencyEur,
    isDefault: false,
    value: 1.07,
  },
  {
    code: Currencies.GBP,
    title: Currencies.GBP,
    logo: currencyGbp,
    isDefault: false,
    value: 1.24,
  },
  {
    code: Currencies.AUD,
    title: Currencies.AUD,
    logo: currencyAud,
    isDefault: false,
    value: 0.65,
  },
  {
    code: Currencies.CAD,
    title: Currencies.CAD,
    logo: currencyCad,
    isDefault: false,
    value: 0.73,
  },
];

export default currencies;