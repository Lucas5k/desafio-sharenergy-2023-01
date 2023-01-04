import { z } from 'zod';

const UserZodSchema = z.object({
  username: z.string({
    required_error: 'username is required',
    invalid_type_error: 'username must be a string',
  }).min(3, { message: 'username must be 3 or more characters long' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }).min(6, { message: 'password must be 6 or more characters long' }),
});

type IUser = z.infer<typeof UserZodSchema>;

export default IUser;
export { UserZodSchema };
