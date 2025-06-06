import { Node } from './node';

export class LinkedList {
  constructor() {
    this.recentHead = null;
    this.sizeOfAll = 0;
  }

  append(value) {
    this.sizeOfAll++;
    const newnode = new Node(value);
    if (!this.recentHead) {
      this.recentHead = newnode;
      return;
    }
    let current = this.recentHead;
    while (current.next) {
      current = current.next;
    }
    current.next = newnode;
  }

  prepend(value) {
    const newnode = new Node(value, this.recentHead);
    this.recentHead = newnode;
    this.sizeOfAll++;
  }

  size() {
    return this.sizeOfAll;
  }

  head() {
    return this.recentHead.value;
  }

  tail() {
    let current = this.recentHead;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  at(index) {
    let current = this.recentHead;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  pop() {
    let current = this.recentHead;
    let previous;
    while (current.next) {
      previous = current;
      current = current.next;
    }
    if (!this.recentHead.next) {
      this.recentHead = null;
      this.sizeOfAll = 0;
    } else {
      previous.next = null;
      current = null;
      this.sizeOfAll--;
    }

    return 'removed';
  }

  contains(value) {
    let current = this.recentHead;
    while (current !== null) {
      if (current.value === value) {
        return true, 'true';
      }
      current = current.next;
    }
    return false, 'false';
  }

  find(value) {
    let current = this.recentHead;
    let counter = 0;
    while (current !== null) {
      if (current.value === value) {
        return counter;
      }
      current = current.next;
      counter++;
    }
    return counter;
  }

  toString() {
    if (!this.recentHead) {
      return 'list is empty';
    }
    let current = this.recentHead;
    let allList = current.value;
    while (current.next) {
      current = current.next;
      allList = `${allList} -> (${current.value})`;
    }
    return `${allList} -> null`;
  }

  insertAt(value, index) {
    let current = this.recentHead;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    current.value = value;
  }

  removeAt(index) {
    let current = this.recentHead;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    this.pop(current);
  }
}
