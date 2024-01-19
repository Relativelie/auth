import { AppInput } from '../../components';

type CredentialsProps = {
  errors: any;
  register: any;
};
const Credentials: React.FC<CredentialsProps> = ({ errors, register }) => {
  return (
    <>
      <AppInput
        type='text'
        placeholder='Email'
        label='Email'
        id='email'
        errors={errors}
        register={register}
        name='email'
        validationSchema={{
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
      />
      <AppInput
        type='password'
        name='password'
        placeholder='Password'
        label='Password'
        id='password'
        errors={errors}
        register={register}
        validationSchema={{
          required: true,
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
      />
    </>
  );
};

export default Credentials;
