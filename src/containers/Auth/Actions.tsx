import { Link, useNavigation } from 'react-router-dom';

import { AppFilledButton, AppOutlinedButton, ButtonType } from '../../components';
import { AuthModeENUM } from './models';

import classes from './index.module.css';

type ActionsProps = {
  isLogin?: boolean;
};

const Actions: React.FC<ActionsProps> = ({ isLogin }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className={classes.actions}>
      <Link to={`?mode=${isLogin ? AuthModeENUM.register : AuthModeENUM.login}`}>
        <AppOutlinedButton title={!isLogin ? AuthModeENUM.login : AuthModeENUM.register} />
      </Link>
      <AppFilledButton
        disabled={isSubmitting}
        type={ButtonType.submit}
        title={isSubmitting ? 'Submitting...' : 'Save'}
      />
    </div>
  );
};

export default Actions;
