import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import "../styles/Form.css";
import { FormTitle, validationSchema, FormValues } from "../constants";
import { signUp } from "../services/authService";

const SignUpPage: React.FC = () => {
  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await signUp(
        values.name!,
        values.email,
        values.password
      );
      console.log("Signup successful: ", response);
      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 500);
    } catch (error) {
      console.log(
        `Error occurred while submitting signup form: ${
          (error as Error).message
        }`
      );
      setSubmitting(false);
    }
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
