import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CgEnter } from 'react-icons/cg';
import { userAction } from '../actions';
import './Login.css';

const FIVE = 5;
class Login extends Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    disabledBtn: true,
  }

  eyePasswordCLick = () => {

  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
    this.verifyButton();
  }

  clickButton = () => {
    const { dispatch, history } = this.props;
    const { inputEmail } = this.state;
    dispatch(userAction(inputEmail));
    history.push('/carteira');
  }

  verifyButton = () => {
    const { inputPassword, inputEmail } = this.state;
    if (inputPassword.length >= FIVE && this.validateEmail(inputEmail)) {
      this.setState({ disabledBtn: false });
    } else this.setState({ disabledBtn: true });
  }

  validateEmail(email) { // Função retirada de https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    const { inputEmail, inputPassword, disabledBtn } = this.state;
    return (
      <section>
        <form className="form-login">
          <div className="img-container">
            <span id="title-red">
              My
              <span id="title-green">Wallet</span>
            </span>
            <img src="https://icons.iconarchive.com/icons/flat-icons.com/flat/512/Wallet-icon.png" alt="Icone do header" width="150px" />
          </div>
          <input
            id="inputEmail"
            type="email"
            data-testid="email-input"
            name="inputEmail"
            value={ inputEmail }
            onChange={ this.handleChange }
            placeholder="Email"
          />
          <input
            id="inputPassword"
            type="password"
            data-testid="password-input"
            name="inputPassword"
            value={ inputPassword }
            onChange={ this.handleChange }
            placeholder="Senha"
          />
          <button
            type="button"
            id="button-login"
            onClick={ this.clickButton }
            disabled={ disabledBtn }
          >
            Entrar
            {' '}
            <CgEnter />
          </button>
          <a href="https://www.linkedin.com/in/thales-souza-chagas-23b651175/" target="_blank" rel="noopener noreferrer">Desenvolvido por Thales Chagas</a>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Login);
