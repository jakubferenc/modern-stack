export const checkPasswordMatch = (
  password: string,
  passwordConfirm: string,
) => {
  return (
    password.toLowerCase().toString() ===
    passwordConfirm.toLowerCase().toString()
  );
};
