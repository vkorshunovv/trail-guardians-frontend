import { UseFormSetValue } from "react-hook-form";

export const FormTitle = {
  login: "Please Log in to your account",
  signup: "Please Sign Up as a Trail Guardian",
};

export const center = {
  lat: 39.470242,
  lng: -0.3768,
};

export interface FormValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;

  eventName?: string;
  date?: string;
  time?: string;
  location?: string;
  volunteersCount?: number;
}

export interface MapClickHandlerProps {
  setMarker: (coords: { lat: number; lng: number }) => void;
  setValue: UseFormSetValue<ReportData>;
}

export interface ReportData {
  id?: number;
  description: string;
  coordinates: string;
  image: FileList;
}

export interface MapComponentProps {
  reports: ReportData[];
  setReports: React.Dispatch<React.SetStateAction<ReportData[]>>;
  setValue: UseFormSetValue<ReportData>;
}
