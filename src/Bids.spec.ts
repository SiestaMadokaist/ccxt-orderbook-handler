import 'mocha';
import { expect } from 'chai';
import { Bids } from './Bids';
import { OrderBook } from './Base';

let priceList = [
  [10, 10],
  [9, 9],
  [8, 8],
  [7, 7],
  [6, 6],
  [5, 5],
  [4, 4],
  [3, 3],
  [2, 2],
  [1, 1]
] as any as Array<[number, number]>;

describe('Bids', () => {
  describe('.pushMulti', () => {
    it('should correctly update the price', () => {
      let bids = new Bids(priceList);
      let updates = [
        [8, 0] as OrderBook,
        [9.5, 4.5] as OrderBook,
      ]
      bids.pushMulti(updates);
      const afterUpdates = bids.toArray();
      const topMost = afterUpdates[0];
      const topSecond = afterUpdates[1];
      expect(topMost[0]).to.eq(9.5);
      expect(topMost[1]).to.eq(4.5);

      expect(topSecond[0]).to.eq(8);
      expect(topSecond[1]).to.eq(0);
    });
  });
});
