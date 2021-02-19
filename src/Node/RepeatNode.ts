import BehaviorTreeStatus from "../BehaviorTreeStatus.js";
import NodeEnumerator from "../NodeEnumerator.js";
import StateData from "../StateData.js";
import BehaviorTreeNodeInterface from "./BehaviorTreeNodeInterface.js";
import ParentBehaviorTreeNodeInterface from "./ParentBehaviorTreeNodeInterface.js";

/**
 * Runs child nodes in sequence, until one fails.
 *
 * @property {string} name - The name of the node.
 */
export default class RepeatNode implements ParentBehaviorTreeNodeInterface {
  /**
   * List of child nodes.
   *
   * @type {BehaviorTreeNodeInterface[]}
   */
  private children: BehaviorTreeNodeInterface[] = [];

  /**
   * Enumerator to keep state
   */
  private enumerator?: NodeEnumerator;

  public constructor(public readonly name: string, private readonly keepState: boolean = false) {
  }

  public init(): void {
    this.enumerator = new NodeEnumerator(this.children);
  }

  public async tick(state: StateData): Promise<BehaviorTreeStatus> {
    if (!this.enumerator || !this.keepState) {
      this.init();
    }

    if (!this.enumerator.current) {
      return BehaviorTreeStatus.Running;
    }
    
      do {
        const status = await this.enumerator.current.tick(state);
        if (status !== BehaviorTreeStatus.Success) {
          if (status === BehaviorTreeStatus.Failure) {
            this.enumerator.reset();
          }

          return BehaviorTreeStatus.Running;
        }

      } while (this.enumerator.next());
      this.enumerator.reset();
      
    

    return BehaviorTreeStatus.Running;
  }

  public addChild(child: BehaviorTreeNodeInterface): void {
    this.children.push(child);
  }
}
