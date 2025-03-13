import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { apiRegister } from "../../redux/auth/operations.js";
import { selectAuthLoading } from "../../redux/auth/selectors.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/Input/Input.jsx";

const schema = yup.object().shape({
  name: yup.string(),
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

const FormRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);

  const onSubmit = async (values) => {
    const { repeatPassword, ...data } = values; // eslint-disable-line no-unused-vars
    const response = await dispatch(apiRegister(data));
    if (!response.error) {
      toast.success("Registration successful!");
      navigate("/home");
      reset();
    } else {
      const errorMessage = response.payload || response.error.message;
      if (errorMessage.includes("User already exists")) {
        toast.error("User already exists. Redirecting to login...");
      } else {
        toast.error("Registration failed. Please try again.");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          control={control}
          rules={{ required: true }}
          placeholder="Name"
        />
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
        <Input
          name="repeatPassword"
          control={control}
          rules={{ required: true }}
          placeholder="repeatPassword"
          type="repeatPassword"
        />
        <button type="submit" disabled={isLoading}>
          Register
        </button>
        {errors.server && (
          <div className="notification">{errors.server.message}</div>
        )}
      </form>
    </>
  );
};

export default FormRegister;
