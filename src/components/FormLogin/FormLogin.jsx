import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../shared/Input/Input.jsx";
import css from "./FormLogin.module.css";
import { selectAuthLoading } from "../../redux/auth/selectors.js";
import { apiLogin } from "../../redux/auth/operations.js";
import { useState } from "react";
// import sprite from "../../assets/sprite.svg";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Email is not valid"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters"),
});

const FormLogin = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    // mode: "onBlur",
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
