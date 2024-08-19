import { UseFormSetValue, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";

export const FormTitle = {
  login: "Please Log in to your account",
  signup: "Please Sign Up as a New Trail Guardian",
};

export const Center = {
  lat: 40.416775,
  lng: -3.70379,
};

export const TileLayerAttr = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors </a>',
};


export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be minimum 2 characters")
    .max(100, "Name must not be more than 100 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirmation is required"),
});

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

export interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  volunteersNeeded: number;
  volunteersSignedUp?: number;
}

export interface EventFormProps {
  onSubmit: SubmitHandler<EventData>;
}

export interface MetricsData {
  totalEvents: number;
  totalTrashCollected: number;
  totalHoursVolunteered: number;
}

export interface GreetingCardProps {
  setMapVisible: (flipped: boolean) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

export interface HeaderProps {
  setModalOpen: (openned: boolean) => void;
}