
/**
 * a mutable data structure to handle
 * update of orderbook price
 * in crypto currency exchanges
 */

export type OrderBook = [number, number];

export abstract class Base {

  private _entries: { [key: string]: number }
  constructor(priceList: Array<OrderBook>){
    this._entries = {};

    for(let [price, amount] of priceList){
      this.push(price, amount)
    };

  };

  private push(price: number, amount: number): void {
    this._entries[price] = amount;
  };

  private keys(): Array<number>{
    return Object.keys(this._entries)
      .map(parseFloat)
      .sort(this.elementCompare.bind(this));
  }

  abstract elementCompare(price1: number, price2: number): number

  toArray(): Array<[number, number]>{
    return this.keys().map((k: number) => [k, this._entries[k]] as OrderBook)
  };

  pushMulti(multi: Array<OrderBook>){
    const updates = [...multi].sort((o1: OrderBook, o2: OrderBook) => {
      const [p1, _1] = o1;
      const [p2, _2] = o2;
      return this.elementCompare(p1, p2);
    });
    const lastElement = updates[updates.length - 1];
    const [lastPrice, lastAmount] = lastElement;
    const keys = this.keys();

    for(let key of keys){
      if(this.elementCompare(key, lastPrice) === 1){ break; }
      delete(this._entries[key]);
    };

    for(let [price, amount] of updates){
      this.push(price, amount)
    };

  };

}
