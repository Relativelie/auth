import classes from './Info.module.css';

type InfoProps = {
  title: string;
  text: string;
};

const Info: React.FC<InfoProps> = ({ title, text }) => {
  return (
    <div className={classes.info}>
      <p className={classes.title}>{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default Info;
