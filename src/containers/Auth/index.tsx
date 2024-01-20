import { SubmitOptions, useSearchParams, useSubmit } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import Actions from './Actions';
import Credentials from './Credentials';
import { AuthModeENUM } from './models';
import { routes } from '../App/constants';

import classes from './index.module.css';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === AuthModeENUM.login;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submit = useSubmit();

  const onSubmit = (data: FieldValues) => {
    const credentials = JSON.stringify(data);
    const actionPath = isLogin ? routes.auth.login : routes.auth.register;
    const options: SubmitOptions = { method: 'post', action: actionPath };
    submit({ credentials }, options);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>{isLogin ? AuthModeENUM.login : AuthModeENUM.register}</h1>

      <Credentials errors={errors} register={register} />
      <Actions isLogin={isLogin} />
    </form>
  );
};

export default Auth;
