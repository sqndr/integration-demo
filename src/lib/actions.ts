export const ACTION_PARAM_NAME = "action";
export const ACTION_VALUE_PARAM_NAME = "value";

export const Action = {
  CREATE_POST: "create-post",
} as const;

export type Action = (typeof Action)[keyof typeof Action];
