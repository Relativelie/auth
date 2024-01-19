import classes from './index.module.css';

export enum ButtonType {
  button = 'button',
  submit = 'submit',
}

type AppFilledButtonProps = {
  title: string;
  onClick?: (e?: React.MouseEvent) => void;
  type?: ButtonType;
  disabled?: boolean;
};

const AppFilledButton: React.FC<AppFilledButtonProps> = ({
  onClick,
  title,
  type = ButtonType.button,
  disabled,
}) => {
  return (
    <button disabled={disabled} type={type} className={classes.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default AppFilledButton;
