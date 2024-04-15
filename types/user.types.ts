export type User = {
  id: string;
  name: string;
  email: string;
  auth_id: string;
  is_deactivated: boolean;
  created_on: Date;
  updated_on: Date;
};

export type CreateUserParams = {
  name: string;
  email: string;
  auth_id: string;
}
