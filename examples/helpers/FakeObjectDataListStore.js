/**
 * Copyright Schrodinger, LLC
 */

import faker from 'faker';

class FakeObjectDataListStore {
  constructor(/*number*/ size) {
    this.size = size || 2000;
    this._cache = [];
  }

  setSize(size) {
    // truncate cache if necessary
    if (this.size < size) {
      this._cache = this._cache.slice(0, size);
    }

    this.size = size;
  }

  createFakeRowObjectData(/*number*/ index) /*object*/ {
    return {
      id: index,
      // avatar: faker.image.avatar(), // NOTE (pradeep): faker.image.avatar() doesn't work unless we upgrade faker to @faker/fakerjs
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 100000000
      )}`,
      city: faker.address.city(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past(),
      buzzPhrase: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.companyName(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence(),
    };
  }

  getObjectAt(/*number*/ index) /*?object*/ {
    if (index < 0 || index > this.size) {
      return undefined;
    }
    if (this._cache[index] === undefined) {
      this._cache[index] = this.createFakeRowObjectData(index);
    }
    return this._cache[index];
  }

  /**
   * Populates the entire cache with data.
   * Use with Caution! Behaves slowly for large sizes
   * ex. 100,000 rows
   */
  getAll() {
    if (this._cache.length < this.size) {
      for (let i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this._cache.slice();
  }

  getSize() {
    return this.size;
  }
}

export default FakeObjectDataListStore;
