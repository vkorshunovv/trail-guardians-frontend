import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import "../styles/Form.css";
import { FormTitle } from "../constants";
import { FormValues } from "../constants";
import { logIn } from "../services/authService";

const LoginPage: React.FC = () => {
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
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await logIn(values.email, values.password);
      //handle next logic
      console.log("Login successful", " ", response);

      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 500);
    } catch (error) {
      console.log(
        `Error occurs while submitting login form: ${(error as Error).message}`
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>{FormTitle.login}</h1>
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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
