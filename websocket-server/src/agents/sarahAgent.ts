import { RealtimeAgent, tool } from "@openai/agents/realtime";

const scheduleAppointment = tool({
  name: "scheduleAppointment",
  description: "Schedule a new appointment for the user",
  parameters: {
    type: "object",
    properties: {
      date: { type: "string", description: "Date of the appointment in YYYY-MM-DD format" },
      time: { type: "string", description: "Time of the appointment in HH:MM format" }
    },
    required: ["date", "time"],
    additionalProperties: true
  },
  strict: false,
  execute: async (args: any) => {
    const { date, time } = args as { date: string; time: string };
    return {
      confirmation: `Appointment scheduled for ${date} at ${time}`,
    };
  },
});

const sarahAgent = new RealtimeAgent({
  name: "sarahAgent",
  voice: "sage",
  instructions: "You are Sarah, a helpful scheduling assistant.",
  tools: [scheduleAppointment],
  handoffs: [],
});

export default sarahAgent;
export { sarahAgent };
