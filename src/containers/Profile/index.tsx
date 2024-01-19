import { useLoaderData } from 'react-router-dom';
import classes from './index.module.css';
import { IProfile } from '../../services/profile';
import Avatar from './avatar/Avatar';
import Info from './info/Info';

const Profile = () => {
  const { name, job, email, location, interests, bio, avatar } = useLoaderData() as IProfile;

  return (
    <div className={classes.outsideContainer}>
      <div className={classes.innerContainer}>
        <Avatar src={avatar} />

        <div>
          <h2>{name}</h2>
          <div className={classes.infoContainer}>
            <Info title='Job' text={job} />
            <Info title='Location' text={location} />
          </div>
          <Info title='Email' text={email} />
          <Info title='Bio' text={bio} />

          <Info title='Interests' text={interests.join(', ')} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
