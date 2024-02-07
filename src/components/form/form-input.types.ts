export type FormInputType = "email" | "number" | "password" | "text" | "url";

export type FormInputErrors = {
  max: boolean;
  min: boolean;
  required: boolean;
};
