import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { apiRegister } from "../../redux/auth/operations.js";
import { selectAuthLoading } from "../../redux/auth/selectors.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../shared/Input/Input.jsx";
import { validationSchemaFormLogin } from "../../validation/validationSchemaFormLogin.js";

import css from "./FormRegister.module.css";
import { useState } from "react";

const FormRegister = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchemaFormLogin),
    mode: "onBlur",
  });

  const { handleSubmit, control, formState } = methods;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const onSubmit = async (values) => {
    const { confirmPassword, ...data } = values; // eslint-disable-line no-unused-vars
    const response = await dispatch(apiRegister(data));
    if (!response.error) {
      toast.success("Registration successful!");
      navigate("/home");
      methods.reset();
    } else {
      const errorMessage = response.payload || response.error.message;
      if (errorMessage.includes("User already exists")) {
        toast.error("User already exists. Redirecting to login...");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div className={css.boxForm}>
        <h2 className={css.titleForm}>Registration</h2>
        <p className={css.textForm}>
          Thank you for your interest in our platform.
        </p>
        <FormProvider {...methods}>
          <form className={css.formRegister} onSubmit={handleSubmit(onSubmit)}>
            <div className={css.boxInput}>
              <Input name="name" control={control} placeholder="Name" />
              <Input name="email" control={control} placeholder="Email" />
              <Input
                name="password"
                control={control}
                placeholder="Password"
                iconButton={"icon"}
                type={isPasswordVisible ? "text" : "password"}
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
              <Input
                name="confirmPassword"
                control={control}
                placeholder="Confirm password"
                iconButton={"icon"}
                type={isPasswordVisible ? "text" : "password"}
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </div>
            <button
              className={css.btnForm}
              type="submit"
              disabled={!formState.isValid || isLoading}
            >
              Register
            </button>
            <p className={css.textLink}>
              Don’t have an account?&nbsp;
              <Link className={css.linkForm} to="/login">
                Register
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default FormRegister;
