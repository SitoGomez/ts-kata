/* eslint-disable */

import 'jest-extended-snapshot';

import { GildedRose, Item } from './kata';

import fc from 'fast-check';

function doUpdateQuality(name: string, sellIn: number, quality: number): Item {
  const item = new Item(name, sellIn, quality);
  const gildedRose = new GildedRose([item]);

  const updatedItem = gildedRose.updateQuality()[0];

  if (updatedItem) {
    return updatedItem;
  }

  return item;
}

describe('Gilded Rose inventary update should', () => {
  test('exist', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);

    expect(gildedRose).not.toBeNull();
  });

  describe.each([
    'one',
    'two',
    'three',
    '',
    undefined,
    null,
    'Backstage passes to a TAFKAL80ETC concert',
    '&R&T/(T/OYGIBV',
  ])('Item name tests', (itemName) => {
    test(`Given a name \`${itemName}\`, the item name doesn\`t change after update`, () => {
      const gildedRose = new GildedRose([new Item(itemName, 0, 0)]);

      gildedRose.updateQuality();

      const expectedResult = new Item(itemName, -1, 0);

      expect(gildedRose.items[0]).toEqual(expectedResult);
    });
  });

  test('Given the name Aged Brie, the quality increases by 1 when was specified as 0', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);

    gildedRose.updateQuality();

    const expectedResult = new Item('Aged Brie', 1, 1);

    expect(gildedRose.items[0]).toEqual(expectedResult);
  })

  test('Given the name Sulfuras, Hand of Ragnaros, the sell-in value decrease 1 when was specified as 0', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);

    gildedRose.updateQuality();

    const expectedResult = new Item('Sulfuras, Hand of Ragnaros', 0, 80);

    expect(gildedRose.items[0]).toEqual(expectedResult);
  })


/*   describe.each([
    {sellin: -51, expected: -52},
    {sellin: -49, expected: -50},
    {sellin: -1, expected: -2},
    {sellin: 0, expected: -1},
    {sellin: 1, expected: 0},
    {sellin: 5, expected: 4},
    {sellin: 6, expected: 5},
    {sellin: 7, expected: 6},
    {sellin: 10, expected: 9},
    {sellin: 11, expected: 10},
    {sellin: 12, expected: 11},
    {sellin: 49, expected: 48},
    {sellin: 51, expected: 50},
  ])('Given a sell-in $sellin for Backstage passes to a TAFKAL80ETC concert decreases by 1', ({sellin, expected}) => {
    it('Then quality should be $expected', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', sellin, 0)]);

      gildedRose.updateQuality();

      expect(Reflect.get(gildedRose.items[0]!, 'name')).toEqual(('Backstage passes to a TAFKAL80ETC concert'));
      expect(Reflect.get(gildedRose.items[0]!, 'sellIn')).toEqual((expected));
    })
  }) */

  test('update quality and sell-in values', () => {
    expect(doUpdateQuality).toVerifyAllCombinations(
      [
        'foo',
        'Aged Brie',
        'Backstage passes to a TAFKAL80ETC concert',
        'Sulfuras, Hand of Ragnaros',
      ],
      [-1, 0, 1, 11],
      [0, 1, 2, 49, 50],
    );
  });

  //Buscar propiedades en nuestro código
describe('Gilded Rose property-based tests', () => {
  describe('quality bounds', () => {
    test('quality should never be negative if its not negative', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.integer({ min: -10, max: 50 }),
          fc.integer({ min: 0, max: 100 }),
          (name: string, sellIn: number, quality: number) => {
            const item = new Item(name, sellIn, quality);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).toBeGreaterThanOrEqual(0);
          },
        ),
      );
    });

    test('selling always decreased by 1 for Backstage passes to a TAFKAL80ETC concert', () => {
      fc.assert(
        fc.property(
          fc.integer(),
          fc.integer({ min: 0, max: 100 }),
          (sellIn: number, quality: number) => {
            const item = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.sellIn).toBe(sellIn - 1);
          },
        ),
      );
    });
  });
});
});


//TODO
//Hacer testing y posteriormente refactor -> Yatsy kata emilyBache
//Instalar extensión de coverage gutter