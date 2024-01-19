import classes from './index.module.css';

type AppContainerProps = {
  title: string;
  children: React.ReactNode;
};

const AppContainer: React.FC<AppContainerProps> = ({ title, children }) => {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default AppContainer;
