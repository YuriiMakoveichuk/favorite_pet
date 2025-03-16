import clsx from "clsx";
import { useState } from "react";
import { useController } from "react-hook-form";

import sprite from "../../assets/sprite.svg";

import css from "./Input.module.css";

const Input = ({
  name,
  control,
  iconButton,
  isPasswordVisible,
  togglePasswordVisibility,
  ...props
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleBlur = () => {
    setIsTouched(true);
    field.onBlur();
  };

  return (
    <>
      <div>
        <div className={css.boxInput}>
          <input
            {...field}
            {...props}
            className={clsx(
              css.input,
              error ? css.invalid : field.value ? css.valid : ""
            )}
            onBlur={handleBlur}
          />
          {isTouched &&
            (error ? (
              <svg
                className={clsx(
                  css.svgInput,
                  iconButton && css.svgInputIconButton,
                  error
                    ? css.svgInputInValid
                    : field.value
                    ? css.svgInputValid
                    : ""
                )}
                width={18}
                height={18}
              >
                <use href={`${sprite}#icon-cross-small`}></use>
              </svg>
            ) : (
              <svg
                className={clsx(
                  css.svgInput,
                  iconButton && css.svgInputIconButton,
                  error
                    ? css.svgInputInValid
                    : field.value
                    ? css.svgInputValid
                    : ""
                )}
                width={18}
                height={18}
              >
                <use href={`${sprite}#icon-check`}></use>
              </svg>
            ))}
          {iconButton && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={css.btnInputPass}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? (
                <svg width={18} height={18}>
                  <use href={`${sprite}#icon-eye`}></use>
                </svg>
              ) : (
                <svg width={18} height={18}>
                  <use href={`${sprite}#icon-eye-off`}></use>
                </svg>
              )}
            </button>
          )}
        </div>
        {error && <p className={css.error}>{error.message}</p>}
      </div>
    </>
  );
};

export default Input;
