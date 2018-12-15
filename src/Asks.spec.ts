import "mocha";
import { expect } from "chai";
import { Asks } from "./Asks";
import { OrderBook } from "./Base";

const priceList = [
  [11, 11],
  [12, 12],
  [13, 13],
  [14, 14],
] as any as Array<[number, number]>;

describe("Asks", () => {
  describe(".pushMulti", () => {
    it("should correctly update the price", () => {
      const bids = new Asks(priceList);
      const updates = [
        [8, 0] as OrderBook,
        [9.5, 4.5] as OrderBook,
      ];
      bids.pushMulti(updates);
      const afterUpdates = bids.toArray();
      const topMost = afterUpdates[0];
      const topSecond = afterUpdates[1];
      expect(topMost[0]).to.eq(8);
      expect(topMost[1]).to.eq(0);

      expect(topSecond[0]).to.eq(9.5);
      expect(topSecond[1]).to.eq(4.5);
    });
  });
});
