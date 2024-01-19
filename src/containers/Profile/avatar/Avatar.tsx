import classes from './Avatar.module.css';

type AvatarProps = {
  src: string;
};

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return <div className={classes.container} style={{ backgroundImage: `url(${src})` }}></div>;
};

export default Avatar;
