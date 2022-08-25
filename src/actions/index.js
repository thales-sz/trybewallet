// Coloque aqui suas actions
import fetchCurrencies from '../helpers/fetchCurrencies';

export const WALLET_ACTION = 'WALLET_ACTION';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const USER_ACTION = 'USER_ACTION';
export const REQUEST_PRICE = 'REQUEST_PRICE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITED_EXPENSE = 'EDITED_EXPENSE';

let counter = 0;

export const userAction = (userData) => ({
  type: USER_ACTION,
  payload: userData,
});

export const walletAction = (walletData, name) => ({
  type: WALLET_ACTION,
  payload: walletData,
  name,
});

export const deleteExpenseAction = (expenseData) => ({
  type: DELETE_EXPENSE,
  payload: expenseData,
});

export const editExpenseAction = (expenseData) => ({
  type: EDIT_EXPENSE,
  payload: expenseData,
});

export const editedExpenseAction = (expenseData) => ({
  type: EDITED_EXPENSE,
  payload: expenseData,
});

export function thunkFetchAction(data) {
  return async (dispatch) => {
    const response = await fetchCurrencies();
    const newExpense = { id: counter, ...data, exchangeRates: response };
    counter += 1;
    return dispatch(walletAction(newExpense, 'expenses'));
  };
}
