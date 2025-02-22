import {DeveloperAction} from "./ai";

export const getDetermineActionPrompt = (content: string) => {
  `
  as a developer, I woud like to determine the action that my boss tells me: "${content}",
  please response in json format: 
  {"type": ActionType}

  Some information that help on providing the response:
  ActionType is one of ${Object.values(DeveloperAction).join(",")},
  `;
};
