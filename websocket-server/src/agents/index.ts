import sarahAgent from "./sarahAgent";

export const agents = [sarahAgent];
export const tools = agents.flatMap((agent) => agent.tools);

export { sarahAgent };
export default sarahAgent;
