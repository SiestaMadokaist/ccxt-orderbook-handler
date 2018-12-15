import { Base } from './Base';
export class Bids extends Base {

  /**
   * @override
   */
  elementCompare(price1: number, price2: number): number {
    if(price2 === price1){ return 0 }
    if(price2 > price1){ return 1 }
    if(price2 < price1){ return -1; }
    throw new Error(`unexpected price comparison: ${price1}|${price2}`);
  };

}
