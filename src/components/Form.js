import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkFetchAction, editedExpenseAction } from '../actions';
import './Form.css';

const INITIAL_STATE = {
  value: '',
  currency: '',
  tag: '',
  method: '',
  description: '',
};

class Form extends Component {
  state = {
    ...INITIAL_STATE,
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  clickButton = () => {
    const { dispatch } = this.props;
    const expenseData = {
      ...this.state,
    };
    dispatch(thunkFetchAction(expenseData));
    this.setState({ ...INITIAL_STATE });
  }

  clickButtonEdit = () => {
    const { dispatch, globalState: { wallet: { expenses, expenseToEdit } } } = this.props;
    const editedExpense = {
      ...this.state,
      id: expenseToEdit.id,
      exchangeRates: expenseToEdit.exchangeRates,
    };
    const index = expenses.indexOf(expenseToEdit);
    expenses[index] = editedExpense;
    dispatch(editedExpenseAction(expenses));
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { globalState: { wallet } } = this.props;
    const { editor } = wallet;
    return (
      <section className="form">
        <div id="title-form">{ editor ? 'Editar Despesa' : 'Nova Despesa' }</div>
        <section className="form-container">
          <label htmlFor="value">
            Valor:
            {' '}
            <input
              id="value"
              type="number"
              value={ value }
              data-testid="value-input"
              name="value"
              onChange={ this.handleChange }
              placeholder="Insira o valor"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            {' '}
            <select
              onChange={ this.handleChange }
              name="currency"
              value={ currency }
              id="currency"
            >
              <option selected hidden>Escolha o moeda</option>
              {wallet.currencies.map((moeda) => (
                <option value={ moeda } key={ moeda }>{moeda}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            {' '}
            <select
              onChange={ this.handleChange }
              name="method"
              value={ method }
              data-testid="method-input"
              id="method"
            >
              <option selected hidden>Escolha o método</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            {' '}
            <select
              onChange={ this.handleChange }
              name="tag"
              value={ tag }
              data-testid="tag-input"
              id="tag"
            >
              <option selected hidden>Escolha a tag</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            {' '}
            <input
              id="description"
              type="text"
              value={ description }
              data-testid="description-input"
              name="description"
              onChange={ this.handleChange }
              placeholder="Breve descrição"
            />
          </label>
          <button
            type="button"
            className="form-button"
            style={
              editor ? { backgroundColor: 'blue' }
                : { backgroundColor: 'lightgreen' }
            }
            onClick={ editor ? this.clickButtonEdit : this.clickButton }
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  globalState: state,
});

Form.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Form);
