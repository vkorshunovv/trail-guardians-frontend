import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
  SubmitHandler,
} from "react-hook-form";
import * as Yup from "yup";

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

export const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
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

export interface ReportProps {
  setReports: React.Dispatch<React.SetStateAction<ReportData[]>>;
  register: UseFormRegister<ReportData>;
  handleSubmit: UseFormHandleSubmit<ReportData>;
  reset: () => void;
  errors: FieldErrors<ReportData>;
  isLeftSidebarOpen: boolean;
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

export interface EventProps {
  isRightSidebarOpen: boolean;
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
  isRegistered: boolean;
  isLogin: boolean;
}

export interface SignUpProps {
  setModalOpen: (openned: boolean) => void;
  setRegistered: (registerred: boolean) => void;
}

export interface LoginProps {
  setModalOpen: (openned: boolean) => void;
  setLogin: (loggedin: boolean) => void;
}
