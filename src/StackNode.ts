// From https://github.com/ts-data/stack/blob/master/stack.ts
// See MIT license at https://github.com/ts-data/stack/blob/master/LICENSE
export default class Node<T> {

  public previous: Node<T>;
  public data: T;

  constructor(data: T, previous: Node<T>) {
      this.previous = previous;
      this.data = data;
  }

}
