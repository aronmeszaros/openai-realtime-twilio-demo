import { FunctionHandler } from "./types";
import { tools } from "./agents";
import { FunctionTool } from "@openai/agents";

const functionTools = tools.filter((t): t is FunctionTool => t.type === "function");

const functions: FunctionHandler[] = functionTools.map((t) => ({
  schema: {
    name: t.name,
    type: "function",
    description: t.description,
    parameters: t.parameters as any,
  },
  handler: async (args: any) => {
    const result = await t.invoke(undefined as any, JSON.stringify(args));
    return typeof result === "string" ? result : JSON.stringify(result);
  },
}));

export default functions;
