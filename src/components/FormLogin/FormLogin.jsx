import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { apiLogin } from "../../redux/auth/operations.js";
import { selectAuthLoading } from "../../redux/auth/selectors.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../shared/Input/Input.jsx";

import css from "./FormLogin.module.css";

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await dispatch(apiLogin(values)).unwrap();
      console.log("Login response:", response);

      toast.success("Login successful!");
      navigate("/home");
      reset();
    } catch (error) {
      if (error === "Email or password invalid") {
        toast.error("Invalid credentials. Redirecting to registration...");
        navigate("/register");
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={css.formLogin}>
        <Input
          name="email"
          control={control}
          rules={{ required: true }}
          placeholder="Email"
        />
        <Input
          name="password"
          control={control}
          rules={{ required: true }}
          placeholder="Password"
          type="password"
        />
        <button type="submit" disabled={isLoading}>
          Log In
        </button>
        {errors.server && (
          <div className="notification">{errors.server.message}</div>
        )}
      </form>
    </>
  );
};

export default FormLogin;
