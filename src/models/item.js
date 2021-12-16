export class Item {
  constructor({
    id,
    name,
    category,
    best_by,
    label = null,
    image = null,
    brand = null,
  }) {
    // protection
    if (!name || !category || !best_by) {
      throw Error('Item missing required properties');
    }
    this.id = id;
    this.key = id;
    this.name = name;
    this.category = category;
    this.best_by = best_by;
    this.label = label;
    this.image = image;
    this.brand = brand;
  }
}
