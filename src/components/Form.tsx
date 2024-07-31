import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import "../styles/Form.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Form = () => {
  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 500);
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="name">
              Name:
              <Field
                type="text"
                name="name"
                className={errors.name && "error"}
              />
              <ErrorMessage name="name" component="div" className="error" />
            </label>

            <label htmlFor="email">
              Email:
              <Field
                type="email"
                name="email"
                className={errors.email && "error"}
              />
              <ErrorMessage name="email" component="div" className="error" />
            </label>

            <label htmlFor="password">
              Password:
              <Field
                type="password"
                name="password"
                className={errors.password && "error"}
              />
              <ErrorMessage name="password" component="div" className="error" />
            </label>

            <label htmlFor="confirmPassword">
              Confirm Password:
              <Field
                type="password"
                name="confirmPassword"
                className={errors.confirmPassword && "error"}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </label>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
