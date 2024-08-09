export const FormTitle = {
  login: "Please Log in to your account",
  signup: "Please Sign Up as a Trail Guardian",
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
  setValue: (name: string, value: string) => void;
}

export interface ReportData {
  id?: number;
  description: string;
  coordinates: string;
  image: File[];
}

export interface MapComponentProps {
  reports: ReportData[];
  setReports: React.Dispatch<React.SetStateAction<ReportData[]>>;
}
