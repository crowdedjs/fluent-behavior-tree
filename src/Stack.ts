// From https://github.com/ts-data/stack/blob/master/stack.ts
// See MIT license at https://github.com/ts-data/stack/blob/master/LICENSE
import Node from "./StackNode.js";

export default class Stack<TData> {

  private _topNode: Node<TData> = undefined;
  private _count: number = 0;

  public count(): number {
      return this._count;
  }

  public isEmpty(): boolean {
      return this._topNode === undefined;
  }

  public push(value: TData): void {
      // create a new Node and add it to the top
      const node = new Node<TData>(value, this._topNode);
      this._topNode = node;
      this._count++;
  }

  public pop(): TData {
      // remove the top node from the stack.
      // the node at the top now is the one before it
      const poppedNode = this._topNode;
      this._topNode = poppedNode.previous;
      this._count--;
      return poppedNode.data;
  }

  public peek(): TData {
      return this._topNode.data;
  }

}
