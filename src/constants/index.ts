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
  eventName?: string;
  date?: string;
  time?: string;
  location?: string;
  volunteersCount?: number;
}

export interface MapClickHandlerProps {
  setMarker: (coords: { lat: number; lng: number }) => void;
  setValue: (name: string, value: string) => void;
}
