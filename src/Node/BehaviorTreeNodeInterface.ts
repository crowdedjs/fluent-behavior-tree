import BehaviorTreeStatus from "../BehaviorTreeStatus.js";
import StateData from "../StateData.js";

export default interface BehaviorTreeNodeInterface {
    tick(state: StateData): Promise<BehaviorTreeStatus>;
}
