/**
 * Copyright Schrodinger, LLC
 */

import { faker } from '@faker-js/faker/locale/en';

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
      avatar: faker.image.avatar(),
      city: faker.location.city(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      street: faker.location.street(),
      zipCode: faker.location.zipCode(),
      date: faker.date.past(),
      buzzPhrase: faker.company.buzzPhrase(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.name(),
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
      for (var i = 0; i < this.size; i++) {
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
