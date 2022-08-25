import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BiTrashAlt } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { deleteExpenseAction, editExpenseAction } from '../actions';
import './Table.css';

class Table extends Component {
  clickButtonEdit = ({ target: { id } }) => {
    const { dispatch, globalState: { wallet: { expenses } } } = this.props;
    const editedExpense = expenses.find((expen) => Number(expen.id) === Number(id));
    dispatch(editExpenseAction(editedExpense));
  }

  clickButtonDelete = ({ target }) => {
    const { dispatch, globalState: { wallet: { expenses } } } = this.props;
    const newState = expenses.filter((expen) => Number(expen.id) !== Number(target.id));
    dispatch(deleteExpenseAction(newState));
  }

  render() {
    const { globalState: { wallet: { expenses } } } = this.props;
    return (
      <table>
        <thead className="table-header">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {expenses.length > 0 ? (
            expenses.map((expense) => {
              const { id,
                description,
                tag, value, currency, method, exchangeRates,
              } = expense;
              const currencyName = (exchangeRates[currency].name).split('/');
              const exchangeValue = Number(exchangeRates[currency].ask);
              const convertedValue = Number(value) * exchangeValue;
              return (
                <tr key={ id } id={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>
                    {Number(value).toLocaleString('en-US',
                      { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </td>
                  <td>{currencyName[0]}</td>
                  <td>
                    {exchangeValue.toLocaleString('en-US',
                      { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </td>
                  <td>
                    {convertedValue.toLocaleString('en-US',
                      { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                  </td>
                  <td>Real</td>
                  <td className="button-container">
                    <button
                      className="edit-btn"
                      type="button"
                      data-testid="edit-btn"
                      id={ id }
                      onClick={ this.clickButtonEdit }
                    >
                      <FiEdit id={ id } />
                    </button>
                    <button
                      className="delete-btn"
                      type="button"
                      data-testid="delete-btn"
                      id={ id }
                      onClick={ this.clickButtonDelete }
                    >
                      <BiTrashAlt id={ id } />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            null
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  globalState: state,
});

Table.propTypes = {
  globalState: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Table);
