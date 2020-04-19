import React ,{Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Products from './Components/Products'
import {Navbar , Nav} from 'react-bootstrap'
import Bracket from './Components/Bracket'
import Filter from './Components/filter'
class App extends Component {
  state = {products:[],
          filterProduct:[],
          cartItems :[],
          size:""
          }
  componentWillMount(){
    if(localStorage.getItem("cartItems")){
        this.setState({cartItems: JSON.parse(localStorage.getItem("cartItems"))})
    }

    fetch("http://localhost:8000/products").then(res => res.json())
    .then(data => this.setState({
      products:data,
      filterProduct:data
    }
    ))
  }
  handleCartAdd = (e,product) => {
      const cartItems = this.state.cartItems
      let isAlreadyExist = false
      cartItems.forEach(cp => {
        if (cp.id === product.id){
          isAlreadyExist=true
          cp.count +=  1
        }
      })
      if (!isAlreadyExist){
        cartItems.push({...product,count:1})  
      }
      localStorage.setItem("cartItems",JSON.stringify(cartItems))
       this.setState({cartItems:cartItems})
     // console.log(this.state.cartItems)
  }

  handleRemove = (e,product) => {
    const cartItems = this.state.cartItems.filter(cp => cp.id !== product.id)
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
    this.setState({cartItems:cartItems})
    }

   listProduct = () => {
    this.setState(state => {
    if(state.sort !== ""){
        this.state.products.sort((a,b) =>
          state.sort === "lowestprice" ? 
          a.price - b.price :
          b.price - a.price
        )
      }
    

    if(state.size !== ""){
      return{
        filterProduct : state.products.filter(p => 
        p.availableSizes.indexOf(state.size) >= 0
        )
      }
    }
    else{
      return{
      filterProduct : state.products}
    }
  })
  }

  changeSize = (e) => {
      this.setState({size:e.target.value})
      this.listProduct()
  }

  handleSort = (e) =>{
    this.setState({sort:e.target.value})
    this.listProduct()
  }


  render(){
  return(
   <>
    
     <Navbar bg="primary" variant="dark">
     <Navbar.Brand href="#home">Shopping</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
    </Navbar>
    <br />
    <div className="container">
    <Filter changeSize={this.changeSize} handleSort={this.handleSort}/>
    <div className="row">
    <div className="col-md-9">
    <Products products={this.state.filterProduct} addCart={this.handleCartAdd}/>
    </div>
    <div className="col-md-3">
      <Bracket cartItems={this.state.cartItems} removeCart={this.handleRemove} />
    </div>

    </div> 
    </div>
  </>
  );
  }
}

export default App;
