import React from 'react';
import request from 'request';

import Search from './components/Search';
import Currency from './components/Currency';
import CryptoListings from './components/CryptoListings';

class App extends React.Component {

  API_KEY = process.env.REACT_APP_COINMARKETCAP_API_KEY;

  constructor() {
    super();
    this.state = {
      responseBody: [],
      currency: 'CAD',
      queryText: '',
      orderBy: 'name',
      orderDir: true
    };
    this.searchListings = this.searchListings.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.callback = this.callback.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
  }

  searchListings(query) {
    this.setState({
      queryText: query
    });
  }

  sortBy(column) {
    var toggleDir = !this.state.orderDir;   

    this.setState({
      orderBy: column,
      orderDir: toggleDir
    });
  }

  changeCurrency(newCurrency) {
    this.requestCryptoListings(newCurrency);
  }

  callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      let parsedBody = JSON.parse(body);
      let currencyKey = Object.keys(parsedBody.data[0].quote);
      this.setState({
        responseBody: parsedBody.data,
        currency: currencyKey
      });
    }
  }

  requestCryptoListings(withCurrency) {
    const options = {
      url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      headers: {
        'X-CMC_PRO_API_KEY': this.API_KEY 
      },
      qs: {
        'convert': withCurrency
      }
    };

    request(options, this.callback);
  }

  componentWillMount() {
    this.requestCryptoListings(this.state.currency);
  }

  render() {
    let order;
    let tempListings = this.state.responseBody;
 
    if (this.state.orderDir) {
      order = 1;
    } else {
      order = -1;
    }

    tempListings = tempListings.sort((a, b) => {
      if(this.state.orderBy === 'price'){
        if (
          a['quote'][this.state.currency]['price'] <
          b['quote'][this.state.currency]['price']
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      } else {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      }
    })
    .filter(eachItem => {
      return (
        eachItem['name']
          .toLowerCase()
          .includes(this.state.queryText.toLowerCase()) ||
        eachItem['symbol']
          .toLowerCase()
          .includes(this.state.queryText.toLowerCase())
      );
    });

    return (
      <div>
        <header>
          <Search
            searchListings={this.searchListings}
          />
          <Currency 
            currency={this.state.currency}
            changeCurrency={this.changeCurrency}
          />
          <CryptoListings
            listings={tempListings}
            currency={this.state.currency}
            sortBy={this.sortBy}
          />
        </header>
      </div>
    );
  }
}

export default App;
