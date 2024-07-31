import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const errors = await schema.validate(formData);

    if (errors) {
      //handle errors
    } else {
      //send data to backend
    }
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <p>{errors.email?.message}</p>
          <input name="password" type="password" ref={register} />
          <p>{errors.password?.message}</p>
          <button type="submit">Login</button>
        </form>
      )}
    </Formik>
  );
};

export default LoginPage;
