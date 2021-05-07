import './App.css';
import ProductListing from './ProductListing'
import React from 'react';

class App extends React.Component {
  state = { products: null }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
      .then(response => response.json())
      .then(data => { this.setState({products : data.products}) });
  }

  render() {
    const { products } = this.state;
    const isLoading = products === null;
    return (
      <main>
        <div className="table-container">
          <div className="uk-overflow-auto">
            <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
              <thead>
                <tr>
                  <th className="uk-table-shrink" >Id</th>
                    <th>Product(mg)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? <tr><td className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                  : products.map((product, index) =>
                      <ProductListing key={index} index={index + 1} product={product}/>
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
