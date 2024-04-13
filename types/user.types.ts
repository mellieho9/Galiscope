export type User = {
  id: string;
  name: string;
  email: string;
  auth_id: string;
  is_deactivated: boolean;
  created_at: Date;
  updated_at: Date;
};

export type CreateUserParams = {
  name: string;
  email: string;
  auth_id: string;
}

export type UpdateUserParams = {
  name?: string;
}
