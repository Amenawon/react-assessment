import './App.css';
import ProductListing from './ProductListing'
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
// Modal.defaultStyles.overlay.backgroundColor = '#f6f6f6';


const customStyles = {
  content: {
     left: '25%',
    transform: 'translateY(-50%)',
    transition: 'opacity .2s ease',
    position: 'absolute',
    top: '42%',
    right: '25%',
    bottom: 'auto',
    width: '50%',
    height:'auto',
    margin: '0 auto',
    marginTop:'4rem',
    backgroundColor:'#fff',
    borderRadius:'5px',
    border:'1px solid #f6f6'
   }
};

class App extends React.Component {
    state = { 
    products: null,
    modalIsOpen: false,
    productName:'',
    previousPrice:'',
    currentPrice:'',
    previousPriceDate:'',
    currentPriceDate:'',
    newProductObj:{},
    productsCopy:[],
    randomId:8 
    }
 
    openModal = () => {
      this.setState({ modalIsOpen: true });
    };
  
    closeModal = () => {
      this.setState({ modalIsOpen: false });
    };
    addToProducts = (event) => {
      event.preventDefault();
      const newProd={
        id: 0, //generate random id on the fields
        name: this.state.productName,
        prices:[
          {
            date:this.state.previousPriceDate,
            id:0,//generate random id on the fields
            price: this.state.previousPrice
          },
          {
            date:this.state.currentPriceDate,
            id: 0,//generate random id on the fields
            price: this.state.currentPrice
          }
        ]
      };
      var totalProd = this.state.products.concat(newProd);
      this.setState({ products: totalProd })
      this.closeModal();
    };

    handleUserInput (e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
    }
    handleCallback = (data) =>{
      this.setState({products: data})
  }

    componentDidMount() {
    fetch('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
      .then(response => response.json())
      .then(data => { this.setState({products : data.products, productsCopy:data}) });
    }

  render() {
    const { products } = this.state;
    const isLoading = products === null;
    return (
      <main>
        <div className="table-container">
          <div className="uk-overflow-auto">
          <div className="align-left"><button className="btn-add" onClick={this.openModal}> Add New Product</button></div>
          <h5>Click on each row to view the historical prices</h5>

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
                      <ProductListing updatedProducts={this.handleCallback} key={index} index={index} product={product} products={products}/>
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
        
        <Modal className="modal" style={customStyles} isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
           <div className="align-right">
          <button className="btn-cancel" onClick={this.closeModal}>X</button>

        </div>
          <div className="add-container">
 
          <div className="row justify-content-evenly">
            <div className="col">
           <p >Product</p>
            <input type="text" id="productName" autoComplete="off"
            onChange={(event) => this.handleUserInput(event)}
             value={this.state.productName} name="productName" placeholder="Enter product name"/>
         </div>
    
            <div className="col">
    <p >Previous price</p>
    <input type="number" id="previousPrice" onChange={(event) => this.handleUserInput(event)}
                name="previousPrice" value={this.state.previousPrice} placeholder="Please provide the previous price "/>
    </div>
            <div className="col">
    <p > Current price</p>
    <input type="number" id="currentPrice" onChange={(event) => this.handleUserInput(event)}
name="currentPrice" value={this.state.currentPrice} placeholder="Please provide the current price "/>
    </div>
      </div>
           <div className="row justify-content-evenly">
            <div className="col-3">
        <p >Date of Previous Price</p>
        <input type="date" id="previousPriceDate" onChange={(event) => this.handleUserInput(event)}
 name="previousPriceDate" value={this.state.previousPriceDate} placeholder="Please provide previous date "/>
      </div>
    <div className="col-3">
            <p >Date of Current price</p>
          <div>
          <input type="date" id="currentPriceDate" onChange={(event) => this.handleUserInput(event)}
 name="currentPriceDate" value={this.state.currentPriceDate} placeholder="Please provide the current date"/>

          </div>
          
            </div>
            <div className="col-3 hide-col">  
            </div>
          </div>
           <div className="align-right">
           <button className="btn-add" onClick={this.addToProducts}> Add Product</button>
          </div>
 </div>
        </Modal>                              
      </main>
    );
  }
}

export default App;
