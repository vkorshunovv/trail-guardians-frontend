import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import "../styles/Form.css";
import {
  initialValues,
  FormValues,
  LoginProps,
  loginValidationSchema,
} from "../constants";
import { logIn } from "../services/authService";

const LoginPage = ({
  setLogin,
  setModalOpen,
  setUserName,
  setUserEvents,
  setUserEmail,
}: LoginProps) => {
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await logIn(values.email, values.password);
      if (!response) {
        throw new Error("Invalid login attempt");
      } //TODO popup

      const userJoinedEvents = JSON.parse(localStorage.getItem("user") || "{}");
      setUserEvents(userJoinedEvents.joinedEvents);
      setUserEmail(response.email);
      setUserName(response.name);
      setModalOpen(false);
      setLogin(true);
      resetForm();
    } catch (error) {
      setErrors({ email: "Invalid email or password" });
      console.log(
        `Error occurred while submitting login form: ${
          (error as Error).message
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Please Log in to your account</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={errors.email && touched.email ? "error" : ""}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={errors.password && touched.password ? "error" : ""}
              />
            </div>
            <div className="button-container">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Log in"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
