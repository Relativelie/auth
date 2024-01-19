import classes from './index.module.css';

export const AppErrorComponent = () => {
  return (
    <div className={classes.error}>
      <h1>Something went wrong... </h1>
      <p>Please restart the page or try again later</p>
    </div>
  );
};

export default AppErrorComponent;
