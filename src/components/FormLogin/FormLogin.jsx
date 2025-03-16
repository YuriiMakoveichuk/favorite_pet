import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../shared/Input/Input.jsx";
import { selectAuthLoading } from "../../redux/auth/selectors.js";

import { apiLogin } from "../../redux/auth/operations.js";

import { validationSchemaFormLogin } from "../../validation/validationSchemaFormLogin.js";

import css from "./FormLogin.module.css";

const FormLogin = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchemaFormLogin),
    mode: "onBlur",
  });

  const { handleSubmit, control, formState } = methods;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const navigate = useNavigate();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const onSubmit = async (values) => {
    try {
      const response = await dispatch(apiLogin(values)).unwrap();
      console.log("Login response:", response);

      toast.success("Login successful!");
      navigate("/home");
      methods.reset();
    } catch (error) {
      if (error === "Email or password invalid") {
        toast.error("Invalid credentials. Redirecting to registration...");
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <div className={css.boxForm}>
        <h2 className={css.titleForm}>Log in</h2>
        <p className={css.textForm}>
          Welcome! Please enter your credentials to login to the platform:
        </p>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={css.formLogin}>
            <div className={css.boxInput}>
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
            </div>
            <button
              className={css.btnForm}
              type="submit"
              disabled={!formState.isValid || isLoading}
            >
              Log In
            </button>
            <p className={css.textLink}>
              Don’t have an account?&nbsp;
              <Link className={css.linkForm} to="/register">
                Register
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default FormLogin;
