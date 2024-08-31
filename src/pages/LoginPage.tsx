import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import "../styles/Form.css";
import { FormValues, LoginProps } from "../constants";
import { logIn } from "../services/authService";

const LoginPage = ({
  setLogin,
  setModalOpen,
  setUserName,
  setUserEvents,
  setUserEmail,
}: LoginProps) => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await logIn(values.email, values.password);
      console.log("Login successful ", response);

      const userJoinedEvents = JSON.parse(localStorage.getItem("user") || "{}");
      setUserEvents(userJoinedEvents.joinedEvents);
      setUserEmail(response.email);
      setUserName(response.name);
      setModalOpen(false);
      setLogin(true);
      resetForm();
    } catch (error) {
      setErrors({ email: "Invalid email or password" });
      //TODO popup message with following error on the screen and DO NOT allow log in
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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
