import { FunctionHandler } from "./types";
import { tools } from "./agents";

const functions: FunctionHandler[] = [];

tools.forEach((tool: any) => {
  const schema =
    tool.schema || {
      name: tool.name,
      type: "function",
      description: tool.description,
      parameters: tool.parameters as any,
    };

  const handler =
    tool.execute ||
    (async (args: any) => {
      const result = await tool.invoke(undefined as any, JSON.stringify(args));
      return typeof result === "string" ? result : JSON.stringify(result);
    });

  functions.push({ schema, handler });
});

export default functions;
