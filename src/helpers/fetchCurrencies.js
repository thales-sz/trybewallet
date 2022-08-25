const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencies = async () => {
  try {
    const response = await fetch(ENDPOINT);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default fetchCurrencies;
