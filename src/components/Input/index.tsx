import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import classes from './index.module.css';

type AppInputProps = {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  validationSchema?: any;
};

const AppInput: React.FC<AppInputProps> = ({
  label,
  type,
  name,
  id,
  placeholder,
  errors = {},
  register,
  validationSchema,
}) => {
  return (
    <div>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={classes.input}
        id={id}
        type={type}
        placeholder={placeholder}
        autoCorrect='off'
        autoComplete='off'
        {...(register ? { ...register(name, validationSchema) } : null)}
      />
      {errors[name] && <span className={classes.span}>{errors[name]?.message?.toString()}</span>}
    </div>
  );
};

export default AppInput;
