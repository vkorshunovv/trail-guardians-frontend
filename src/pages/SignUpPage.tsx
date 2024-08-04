import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import '../styles/Form.css'
import { FormTitle } from "../constants";
import { FormValues } from "../constants";


const SignUpPage: React.FC = () => {
  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
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
      .required("Confirm Password is required"),
  });

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="form-container">
      <h1>{FormTitle.signup}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <Field name="name" type="text" />
              <ErrorMessage
                name="name"
                component="div"
                className={errors.name ? "error" : ""}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={errors.email ? "error" : ""}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={errors.password ? "error" : ""}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={errors.confirmPassword ? "error" : ""}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Sign up"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpPage;
