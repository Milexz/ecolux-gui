import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '300px',
    justifyContent: 'center',
    margin: '100px auto',
    padding: '12px',
    width: '300px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: '18px',
  },
  button: {
    height: '56px',
  },
}));

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailHelperText, setEmailHelperText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordHelperText, setPasswordHelperText] = React.useState('');
  const classes = useStyles();

  const loginSuccess = sessionStorage.getItem('loginSuccess');
  const emailRegex = '^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';
  const passwordRegex = '^[a-zA-Z0-9]+$';

  if (loginSuccess === 'true') {
    window.location.href = '/dashboard';
    return (
      <h3>Checking Authority...</h3>
    );
  }

  const checkEmailFormat = (email) => {
    console.log('checkEmailFormat: ', email);
    if (email.trim().length === 0) {
      setEmailError(true);
      setEmailHelperText('Email is required');
      return false;
    }
    if (email.match(emailRegex) === null) {
      setEmailError(true);
      setEmailHelperText('Email format error');
      return false;
    }
    
    setEmailError(false);
    setEmailHelperText('');
    return true;
  };

  const checkPasswordFormat = (password) => {
    console.log('checkPasswordFormat: ', password);
    // if (password.trim().length === 0) {
    //   setPasswordError(true);
    //   setPasswordHelperText('Password is required');
    //   return false;
    // }
    if (password.match(passwordRegex) === null) {
      setPasswordError(true);
      setPasswordHelperText('Password format error: only letters and numbers are allowed');
      return false;
    }
    
    setPasswordError(false);
    setPasswordHelperText('');
    return true;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login');
    const validEmail = checkEmailFormat(email);
    const validPassword = checkPasswordFormat(password);

    if (validEmail && validPassword) {
      sessionStorage.setItem('loginSuccess', 'true');
      window.location.href = '/dashboard';
    }
  };

  const handleEmailChange = (event) => {
    console.log('Email: ', event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    console.log('Password: ', event.target.value);
    setPassword(event.target.value);
  };

  return (
    <div className={classes.root}>
      <h2>Welcome!</h2>
      <p>Login by entering email and password.</p>
      <form className={classes.form} autoComplete="on" onSubmit={handleLogin}>
        <TextField id="login-email" className={classes.textField}
          label="Email"
          name="email"
          onChange={handleEmailChange}
          // required
          // type="email"
          value={email}
          error={emailError}
          helperText={emailHelperText}
          variant="outlined"
          color="primary"
        />
        <TextField id="login-password" className={classes.textField}
          label="Password"
          name="password"
          onChange={handlePasswordChange}
          // required
          type="password"
          value={password}
          error={passwordError}
          helperText={passwordHelperText}
          variant="outlined"
          color="primary"
        />
        <Button id="login-sign-in-button" className={classes.button}
          type="submit"
          disabled={email.length === 0 || password.length === 0}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
