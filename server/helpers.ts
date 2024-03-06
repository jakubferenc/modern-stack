export const checkPasswordMatch = (
  password: string,
  passwordConfirm: string,
) => {
  return password === passwordConfirm;
};
