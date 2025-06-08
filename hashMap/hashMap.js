class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
    this.collisionBuckets = new Array(this.capacity);
    this.counter = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % 16;
  }

  set(key, value) {
    let index = this.hash(key);
    if (this.buckets[index]) {
      if (this.collisionBuckets[index]) {
        let i = index;
        let current = this.collisionBuckets[index];

        while (current.next) {
          current = this.collisionBuckets[current.next];
        }
        while (this.collisionBuckets[i]) {
          i++;
          this.collisionBuckets[i];
        }
        this.collisionBuckets[i] = { key: key, value: value, next: null };
        current.next = i;
      } else {
        this.collisionBuckets[index] = { key: key, value: value, next: null };
        this.buckets[index].next = index;
      }
    } else {
      this.buckets[index] = { key: key, value: value, next: null };
    }
    this.counter++;
  }

  get(key) {
    let index = this.hash(key);
    let item = this.buckets[index];

    while ((item && item.key !== key) || (item && item.next !== null)) {
      item = this.collisionBuckets[item.next];
    }

    return item ? item : null;
  }
  has(key) {
    let index = this.hash(key);
    let item = this.buckets[index];

    while ((item && item.key !== key) || (item && item.next !== null)) {
      item = this.collisionBuckets[item.next];
    }

    return item ? true : false;
  }

  remove(key) {
    let index = this.hash(key);
    let item = this.buckets[index];
    if (item && item.key === key) {
      this.counter--;
      if (item.next !== null) {
        this.buckets[index] = this.collisionBuckets[item.next];
        this.collisionBuckets[item.next] = 'removed';
      } else {
        this.buckets[index] = 'removed';
      }
    } else {
      let previous = item;
      while (item.key !== key) {
        previous = item;
        item = this.collisionBuckets[item.next];
      }

      this.collisionBuckets[previous.next] = 'removed';
      previous.next = item.next;
      this.counter--;
    }
    return 'done';
  }

  length() {
    console.log(this.counter);
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.collisionBuckets = new Array(this.capacity);
    this.counter = 0;
  }

  keys() {
    let allKeys = [];
    for (let index = 0; index < this.capacity * 2; index++) {
      if (this.buckets[index] && this.buckets[index].key) {
        allKeys.push(this.buckets[index].key);
      }
      if (this.collisionBuckets[index] && this.collisionBuckets[index].key) {
        allKeys.push(this.collisionBuckets[index].key);
      }
    }
    console.log(allKeys);
  }

  values() {
    let allVals = [];
    for (let index = 0; index < this.capacity * 2; index++) {
      if (this.buckets[index] && this.buckets[index].value) {
        allVals.push(this.buckets[index].value);
      }
      if (this.collisionBuckets[index] && this.collisionBuckets[index].value) {
        allVals.push(this.collisionBuckets[index].value);
      }
    }
    console.log(allVals);
  }

  entries() {
    let allEntries = [];
    for (let index = 0; index < this.capacity * 2; index++) {
      if (this.buckets[index] && this.buckets[index].value) {
        allEntries.push([this.buckets[index].key, this.buckets[index].value]);
      }
      if (this.collisionBuckets[index] && this.collisionBuckets[index].value) {
        allEntries.push([this.collisionBuckets[index].key, this.collisionBuckets[index].value]);
      }
    }
    console.log(allEntries);
  }
}

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

test.remove('lion');
test.entries();
test.length();
