import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import "../styles/Form.css";
import {
  validationSchema,
  FormValues,
  initialValues,
  SignUpProps,
} from "../constants";
import { signUp } from "../services/authService";

const SignUpPage = ({ setModalOpen, setRegistered }: SignUpProps) => {
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await signUp(
        values.name!,
        values.email,
        values.password
      );
      console.log("Signup successful: ", response);
      resetForm();
      setRegistered(true);
      setModalOpen(false);
      setSubmitting(false);
    } catch (error) {
      console.log(
        `Error occurred while submitting signup form: ${
          (error as Error).message
        }`
      );
      setSubmitting(false);
      //TODO popup message with following error on the screen
    }
  };

  return (
    <div className="form-container">
      <h1>Please Sign Up as a New Trail Guardian</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />
              <ErrorMessage
                name="name"
                component="div"
                className={errors.name ? "error" : ""}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={errors.email ? "error" : ""}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={errors.password ? "error" : ""}
                //TODO restrict to copy from this field
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={errors.confirmPassword ? "error" : ""}
              />
            </div>
            <div className="button-container">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Sign up"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpPage;
