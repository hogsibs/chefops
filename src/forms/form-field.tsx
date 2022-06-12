import { InputHTMLAttributes, useId } from "react";
import {
  useController,
  Path,
  Control,
  FieldValues as FieldValuesBase,
} from "react-hook-form";
import styles from "./form-field.module.css";

export interface InputFieldProperties<FieldValues extends FieldValuesBase>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<FieldValues>;
  name: Path<FieldValues>;
}

const InputField = <FieldValues extends FieldValuesBase>({
  control,
  name,
  ...properties
}: InputFieldProperties<FieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });
  const errorId = useId();
  return (
    <div className={styles["form-field-container"]}>
      <input
        {...properties}
        {...field}
        aria-invalid={Boolean(error)}
        aria-errormessage={errorId}
      />
      {error && (
        <span id={errorId} aria-live="polite">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputField;
