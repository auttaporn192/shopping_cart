import React, { Component } from 'react'

export class Bracket extends Component {
    
    render() {
        const  { cartItems } = this.props;
        return (
            
            <div className="alert alert-info">
            {cartItems.length === 0
                    ? "Basket is empty" :
                    <div>You have {cartItems.length} items in the basket. <hr /></div>
                }
            {cartItems.length > 0 &&
            <div>
                {cartItems.map(item =>
                    <>
                    <p> {item.title}  </p>
                    <button className="btn btn-danger btn-xs" onClick={(e)=>this.props.removeCart(e,item)}></button>
                    <b>  Qty:  {item.count}  price : {item.price} </b> 
                    </>
                )}
                <br />
                <b> Total : {cartItems.reduce((sum,number) =>
                    (sum + number.price * number.count) ,0 )}
                 </b>
                </div>
    }
            </div>
            
        )
    }
}

export default Bracket
