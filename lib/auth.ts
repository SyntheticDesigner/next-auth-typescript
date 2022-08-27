import { hash, compare } from "bcrypt";
export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12);
  //we hash the password so we don't store users actual password on the database
  return hashedPassword;
};

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
