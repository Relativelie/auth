import classes from './index.module.css';

type AppOutlinedButtonProps = {
  title: string;
  onClick?: (e?: React.MouseEvent) => void;
};

const AppOutlinedButton: React.FC<AppOutlinedButtonProps> = ({ onClick, title }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default AppOutlinedButton;
