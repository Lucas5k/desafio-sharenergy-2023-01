import { z } from 'zod';

const RegisterZodSchema = z.object({
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string',
  }).min(3, { message: 'name must be 3 or more characters long'}),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string',
  }).email().trim().max(18).min(1),
  telephone: z.string({
    required_error: 'telephone is required',
    invalid_type_error: 'telephone must be a number',
  }).max(11).min(11),
  address: z.string({
    required_error: 'address is required',
    invalid_type_error: 'address must be a string',
  }).min(7, { message: 'address must be 7 or more characters long'}),
  cpf: z.string({
    required_error: 'cpf is required',
    invalid_type_error: 'cpf must be a number',
  }).min(11, { message: 'cpf must be 11 characters'}),
});

type IRegister = z.infer<typeof RegisterZodSchema>;

export default IRegister;
export { RegisterZodSchema };
