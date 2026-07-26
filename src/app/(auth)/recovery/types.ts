export type ErrorState = {
  email?: string[];
  password?: string[];
  token?: string[];
  _form?: string[];
};

export type SendCodeState = {
  errors?: ErrorState;
  message?: string;
  success?: boolean;
} | null;

export type VerifyCodeState = {
  errors?: ErrorState;
  message?: string;
  success?: boolean;
} | null;

export type UpdatePasswordState = {
  errors?: ErrorState;
  message?: string;
  success?: boolean;
} | null;
