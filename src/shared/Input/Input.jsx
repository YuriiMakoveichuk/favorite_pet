import clsx from "clsx";
import css from "./Input.module.css";

import { useController } from "react-hook-form";

const Input = ({ name, control, rules, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <input
        {...field}
        {...props}
        className={clsx(css.input, error ? css.invalid : css.valid)}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Input;
