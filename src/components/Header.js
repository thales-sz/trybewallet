import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

const INITIAL_VALUE = 0;
const ONE_HUNDRED = 100;

class Header extends Component {
  twoDecimalPlaces(number) {
    return Math.floor(number * ONE_HUNDRED) / ONE_HUNDRED;
  }

  render() {
    const { globalState: { user, wallet: { expenses } } } = this.props;
    const totalValue = expenses.reduce((accExp, currExp) => {
      const { exchangeRates, currency, value } = currExp;
      const total = (Number(value) * Number(exchangeRates[currency].ask));
      return (
        accExp + this.twoDecimalPlaces(total)
      );
    }, INITIAL_VALUE);
    return (
      <header className="header-container">
        <div className="img-container">
          <span id="title-red">
            My
            <span id="title-green">Wallet</span>
          </span>
          <img src="https://icons.iconarchive.com/icons/flat-icons.com/flat/512/Wallet-icon.png" alt="Icone do header" width="80px" />
        </div>
        <div className="info-container">
          <div id="title">Total gasto:</div>
          <div data-testid="total-field" className="header-total">
            {expenses.length > 0 ? (
              totalValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            ) : (
              'R$ 0'
            )}
          </div>
        </div>
        <div className="info-container">
          <div id="title">Usuário:</div>
          <div data-testid="email-field" className="header-email">
            {user.email}
          </div>
        </div>
        <div className="currency-container">
          <div id="title">Moeda de conversão:</div>
          <div data-testid="header-currency-field" className="header-currency">
            BRL
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  globalState: state,
});

Header.propTypes = {
  globalState: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Header);
