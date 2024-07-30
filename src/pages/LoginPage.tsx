import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" type="email" ref={register} />
      <p>{errors.email?.message}</p>
      <input name="password" type="password" ref={register} />
      <p>{errors.password?.message}</p>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
