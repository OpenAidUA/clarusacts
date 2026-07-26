export type RegisterState = {
  errors?: {
    name?: string[];
    organizationName?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  message?: string;
} | null;
