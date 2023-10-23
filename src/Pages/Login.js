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
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const [emailError, setEmailError] = React.useState(false);
  const [emailHelperText, setEmailHelperText] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordHelperText, setPasswordHelperText] = React.useState('');
  const classes = useStyles();

  const loginSuccess = sessionStorage.getItem('user') !== null;
  const emailRegex = '^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';
  // EMAIL_REGEX_BY_CHATGPT = /^(?:(?:(?:(?:[a-zA-Z]|\d|[!#\$\%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(?:\.([a-zA-Z]|\d|[!#\$\%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|(?:(?:\x22)(?:(?:(?:(?:\x20|\x09)*(?:\x0d\x0a))?(?:\x20|\x09)+)?(?:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(?:(?:[\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(?:(?:(?:\x20|\x09)*(?:\x0d\x0a))?(\x20|\x09)+)?(?:\x22))))@(?:(?:(?:[a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(?:(?:[a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(?:[a-zA-Z]|\d|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*(?:[a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(?:(?:[a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(?:(?:[a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(?:[a-zA-Z]|\d|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*(?:[a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;
  const passwordRegex = '^[a-zA-Z0-9]+$';

  if (loginSuccess) {
    window.location.href = '/dashboard';
    return null;
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
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log('Login', {email}, {password});

    const validEmail = checkEmailFormat(email);
    const validPassword = checkPasswordFormat(password);

    if (validEmail && validPassword) {
      sessionStorage.setItem('loginSuccess', 'true');
      sessionStorage.setItem('user', email);
      window.location.href = '/dashboard';
    }
  };

  const handleEmailChange = (event) => {
    console.log('Email: ', event.target.value);
    // if checking format when onChange, implement here
  };

  const handlePasswordChange = (event) => {
    console.log('Password: ', event.target.value);
    // if checking format when onChange, implement here
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
          inputRef={emailRef}
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
          inputRef={passwordRef}
          error={passwordError}
          helperText={passwordHelperText}
          variant="outlined"
          color="primary"
        />
        <Button id="login-sign-in-button" className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
