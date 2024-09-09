import bcrypt from "bcrypt";

const hashPassword = async (plainPassword: string, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  return hashedPassword;
};

export default hashPassword;
