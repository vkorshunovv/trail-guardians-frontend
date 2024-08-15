import { UseFormSetValue } from "react-hook-form";

export const FormTitle = {
  login: "Please Log in to your account",
  signup: "Please Sign Up as a Trail Guardian",
};

export const Center = {
  lat: 40.416775,
  lng: -3.70379,
};

export const TileLayerAttr = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

export interface FormValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
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
