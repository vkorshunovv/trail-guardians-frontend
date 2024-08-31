import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import "../styles/Form.css";
import {
  validationSchema,
  FormValues,
  initialValues,
  SignUpProps,
} from "../constants";
import { signUp } from "../services/authService";

const SignUpPage = ({
  setModalOpen,
  setRegistered,
  setUserName,
}: SignUpProps) => {
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
      setUserName(values.name!);
    } catch (error) {
      //TODO popup message with following error on the screen and DO NOT allow sign up
      console.log(
        `Error occurred while submitting signup form: ${
          (error as Error).message
        }`
      );
      setSubmitting(false);
    }
  };

  const handleLoginRedirection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegistered(true);
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
            <div className="button-container" id="signup-btn-container">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Sign up"}
              </button>
              <button
                className="loginBtn"
                onClick={(e) => handleLoginRedirection(e)}
              >
                Log in
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpPage;
