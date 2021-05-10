import React from 'react';
import { slideDown, slideUp } from './anim';
import Modal from 'react-modal';

Modal.setAppElement('#root');
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


function formatDate(date) {
    return date.substr(0, 10);
  }
  


class ProductListing extends React.Component {
 

    constructor(props) {
      super(props);
      this.expanderBody = React.createRef();
      // this.state = {
      //   products: props.products
      // }
      this.state = { expanded: false ,
        modalIsOpen:false,
        productName:'',
        previousPrice:'',
        currentPrice:'',
        previousPriceDate:'',
        currentPriceDate:'',
        currentIndex:null,
        products: props.products,
    }
    }
  
  openModal = (product, index) => {
     this.setState({ modalIsOpen: true ,
      productName:product.name,
      previousPrice:product.prices[0].price,
      currentPrice:product.prices[1].price,
      previousPriceDate:product.prices[0].date,
      currentPriceDate:product.prices[1].date,
      currentIndex:index});
  };

  saveProducts= (event)=>{
    this.setState((state,props)=>({ 
      // productName:this.state.productName,
      // currentPrice:this.state.currentPrice,
      // previousPrice:this.state.previousPrice,
      products:[...this.state.products, //optimize this code
         this.state.products.map((item, index) => {
           
         if(this.state.currentIndex === index){
          item.name = this.state.productName;
          item.prices[0].price = this.state.currentPrice;
          item.prices[1].price = this.state.previousPrice;
          return item;
        }
      }
         )
    ]
    })); 
     this.props.updatedProducts(this.state.products);
     this.closeModal();

  }
  
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  deleteProduct = (product, index) => {
    console.log(product,this.state.products);

    var array = [...this.state.products]; // make a separate copy of the array
    
    this.setState({
      products:[...array,array.map((item,i)=>{
      if(index === i){
        delete item.name;
        delete item.id;
        return item

      }
    })
    ]

});
     this.props.updatedProducts(this.state.products);

};
  
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }
  toggleExpander = (e) => {
 
    if (!this.state.expanded) {
      this.setState(
        { expanded: true },
        () => {
          if (this.refs.expanderBody) {
            slideDown(this.refs.expanderBody);
          }
        }
      );
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => { this.setState({ expanded: false }); }
      });
    }
  }

  render() {
    const { product } = this.props;
     return [
       <tr key={'tr-expander-children'+product.id} >
        <td className="uk-text-nowrap">{product.id}.</td>
        <td>{product.name}</td>
        <td> <button onClick={()=> {this.openModal(product,this.props.index ) }} className="btn-edit">Edit Product</button> 
      </td>
      <td> 
        <button className="btn-edit"  onClick={this.toggleExpander}>View Prices</button>
      </td>
        <td> <button className="btn-delete" onClick={()=> {this.deleteProduct(product,this.props.index ) }}>Delete Product</button></td>
      </tr>,
      this.state.expanded && ( product.prices.map((item, index) =>
       <tr className="expandable" key={'tr-expander'+index}>
          <td className="" colSpan={6} key={'tr-expander-child'+index} >
            <div ref="expanderBody" key={'tr-expander-children'+index} className="inner uk-grid">
            <div className="uk-width-3-4">
   <b> <p>Price at {formatDate(item.date)} was {item.price}</p></b>
              </div>
            </div>
          </td>
      
        </tr>
        
      )
      ),
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
   <input type="text" readOnly={true} id="previousPriceDate" onChange={(event) => this.handleUserInput(event)}
name="previousPriceDate" value={formatDate(this.state.previousPriceDate)} placeholder="Please provide previous date "/>
 </div>
<div className="col-3">
       <p >Date of Current price</p>
     <div>
     <input type="text" readOnly={true} id="currentPriceDate" 
name="currentPriceDate" value={formatDate(this.state.currentPriceDate)} placeholder="Please provide the current date"/>

     </div>
     
       </div>
       <div className="col-3 hide-col">  
       </div>
     </div>
      <div className="align-right">
      <button className="btn-add" onClick={this.saveProducts}> Save</button>
     </div>
 </div>
   </Modal>                              

    ];
    
  }
}


export default ProductListing