export const FormTitle = {
  login: "Please Log in to your account",
  signup: "Please Sign Up as a Trail Guardian",
};

export interface FormValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  description?: string;
  coordinates?: string;
  uploadImage?: FileList;
}
