import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from "react-router";
import $ from 'jquery';

const axios = require('axios');


class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', /*
      nickname: '',
      name: '',
      last_name: '',*/
      password: '',
      password_confirmation: ''
    }
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  componentDidMount = () => {
    if (sessionStorage.getItem('user')){
      this.props.history.push('/');
    }
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isLogin) {
      this.handleLogin();
    }
    else{
      this.handleSignup();
    }
  };

  handleLogin = () => {
    
    /*
    axios.post('http://localhost:3001/auth/sign_in', {...this.state})
    .then( resp => {
      sessionStorage.setItem('user', JSON.stringify(resp['headers']));
      this.props.history.push('/');
    })
    .catch( e => {
      this.props.history.push('/login', { severity: 'danger', message: 'Invalid email/password' })
    });*/

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3001/auth/sign_in',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .done((response, status, jqXHR) => {
    
      let obj = {};
      obj['access-token'] = jqXHR.getResponseHeader('access-token');
      obj['client'] = jqXHR.getResponseHeader('client');
      obj['uid'] = response.data.uid
      obj['Access-Control-Allow-Origin'] = jqXHR.getResponseHeader('Access-Control-Allow-Origin');

      sessionStorage.setItem('user', JSON.stringify(obj));

      this.props.history.push('/');
    })
    .fail( resp => {
      this.setState({ email: '', password: '', password_confirmation: ''});
      this.props.history.push('/login', { severity: 'danger', message: 'Invalid email/password' })
    });

  }

  handleSignup = () => {
    
    /*
    axios.post('http://localhost:3001/auth', {...this.state})
    .then( resp => {
      this.props.history.push('/login', { severity: 'success', message: 'User created successfully. Please Log In!' })
    })
    .catch( e => {
      this.props.history.push('/signup', { severity: 'danger', message: 'There are errors in the data' })
    });*/

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3001/auth',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .done((response, status, jqXHR) => {
    
      let obj = {};
      obj['access-token'] = jqXHR.getResponseHeader('access-token');
      obj['client'] = jqXHR.getResponseHeader('client');
      obj['uid'] = response.data.uid
      obj['Access-Control-Allow-Origin'] = jqXHR.getResponseHeader('Access-Control-Allow-Origin');

      sessionStorage.setItem('user', JSON.stringify(obj));

      this.props.history.push('/login', { severity: 'success', message: 'User created successfully. Please Log In!' });
    })
    .fail( resp => {
      this.props.history.push('/signup', { severity: 'danger', message: 'There are errors in the data' });
    });

  }

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      emailLabel,
      emailInputProps, /*
      nicknameLabel,
      nicknameInputProps,
      nameLabel,
      nameInputProps,
      lastnameLabel,
      lastnameInputProps,*/
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>

        { this.props.location 
          && this.props.location.state
          && this.props.location.state.severity
          && (
            <Alert color={this.props.location.state.severity}>
              {this.props.location.state.message}
            </Alert>
          )
        }

        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}

        <FormGroup>
          <Label for={emailLabel}>{emailLabel}</Label>
          <Input {...emailInputProps} 
                  value={this.state.email}
                  onChange={ (e) => this.setState({[e.target.name]: e.target.value.trim()}) }  />
        </FormGroup>

        {/*this.isSignup && (
          <div>
            <FormGroup>
              <Label for={nicknameLabel}>{nicknameLabel}</Label>
              <Input {...nicknameInputProps} 
                      value={this.state.nickname}
                      onChange={ (e) => this.setState({[e.target.name]: e.target.value}) } />
            </FormGroup>

            <FormGroup>
              <Label for={nameLabel}>{nameLabel}</Label>
              <Input {...nameInputProps} 
                      value={this.state.name}
                      onChange={ (e) => this.setState({[e.target.name]: e.target.value }) } />
            </FormGroup>

            <FormGroup>
              <Label for={lastnameLabel}>{lastnameLabel}</Label>
              <Input {...lastnameInputProps} 
                      value={this.state.last_name}
                      onChange={ (e) => this.setState({[e.target.name]: e.target.value }) }  
                      />
            </FormGroup>
          </div>
        )*/}

        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} 
                  value={this.state.password}
                  onChange={ (e) => this.setState({[e.target.name]: e.target.value }) }
                    />
        </FormGroup>

        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} 
                    value={this.state.confirm_password}
                    onChange={ (e) => this.setState({[e.target.name]: e.target.value }) }  
                    />
          </FormGroup>
        )}
        {/*
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>*/}
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  emailLabel: 'Email',
  emailInputProps: {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'your@email.com',
  }, /*
  nicknameLabel: 'Nickname',
  nicknameInputProps: {
    id: 'nickname',
    name: 'nickname',
    type: 'text',
    placeholder: 'nickname',
  },
  nameLabel: 'Name',
  nameInputProps: {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'name',
  },
  lastnameLabel: 'Last name',
  lastnameInputProps: {
    id: 'last_name',
    name: 'last_name',
    type: 'text',
    placeholder: 'last name',
  },*/
  passwordLabel: 'Password',
  passwordInputProps: {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    id: 'password_confirmation',
    name: 'password_confirmation',
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default withRouter(AuthForm);
