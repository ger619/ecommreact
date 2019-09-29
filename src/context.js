import React, { Component } from 'react'
import  {storeProducts, detailProduct} from './data'
const ProductContext = React.createContext();


class ProductProvider extends Component {
    state = {
      products: [],
      detailProduct: detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0
    };
    componentDidMount() {
      this.setProducts();
    }
  
    setProducts = () => {
      let products = [];
      storeProducts.forEach(item => {
        const singleItem = { ...item };
        products = [...products, singleItem];
      });
      this.setState(() => {
        return { products };
      }, this.checkCartItems);
    };
      
    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
      };

    handleDetail = id =>{
        const product = this.getItem(id);
        this.setState(() => {
          return { detailProduct: product };
        });
      };

   addToCart =() =>{
           console.log('hello from Cart');
       };
   
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail, 
                addToCart: this.addToCart, 

            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer}