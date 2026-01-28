export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Item[];

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.doUpdate(item);
    });

    return this.items;
  }

  //TODO: Lift up conditional technique

  private doUpdate(item: Item) {
    switch (item.name) {
      case 'Aged Brie':
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        break;
      case 'Sulfuras, Hand of Ragnaros':
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          item.quality = item.quality - item.quality;
        }
        break;
      default:
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          if (item.quality > 0) {
            item.quality = item.quality - 1;
          }
        }
        break;
    }
  }
}
