import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
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
  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .min(7, "Repeat password must be at least 7 characters"),
});

const FormRegister = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { handleSubmit, control, formState } = methods;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);

  const onSubmit = async (values) => {
    const { repeatPassword, ...data } = values; // eslint-disable-line no-unused-vars
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
        navigate("/login");
      }
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="name" control={control} placeholder="Name" />
          <Input name="email" control={control} placeholder="Email" />
          <Input
            name="password"
            control={control}
            placeholder="Password"
            type="password"
          />
          <Input
            name="repeatPassword"
            control={control}
            placeholder="repeatPassword"
            type="repeatPassword"
          />
          <button type="submit" disabled={isLoading}>
            Register
          </button>
          {formState.errors.server && (
            <div className="notification">
              {formState.errors.server.message}
            </div>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default FormRegister;
