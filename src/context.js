import React, { Component } from 'react'
import  {storeProducts, detailProduct} from './data'
const ProductContext = React.createContext();


class ProductProvider extends Component {
    state = {
      products: [],
      detailProduct: detailProduct,
      cart: [],
      modalOpen: true,
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

   addToCart = id =>
    {
      let tempProducts = [...this.state.products];
      const index = tempProducts.indexOf(this.getItem(id));
      const product = tempProducts[index];
      product.inCart = true;
      product.count = 1;
      const price = product.price;
      product.total = price;
      this.setState( ()=> 
        {
          return { products: tempProducts,cart:[...this.state.cart] };
        }, ()=> console.log(this.state));
    };


    openModal = id => {
      const product = this.getItem(id);
      this.setState(() => {
        return { modalProduct: product, modalOpen: true };
      });
    };
    closeModal = () => {
      this.setState(() => {
        return { modalOpen: false };
      });
    };
   
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail, 
                addToCart: this.addToCart, 
                openModal: this.openModal,
                closeModal: this.closeModal

            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer}