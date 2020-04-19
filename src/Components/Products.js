import React, { Component } from 'react'

export class Products extends Component {
    render() {
        const {products,addCart} = this.props
        return (
            <div className="row">
                {products.map(product => 
                    <div className="col-md-4" key={product.id}>
                        <div className="thumbnail text-center">
                       <a href={`#${product.id}`}>
                        <img src={`products/${product.sku}_2.jpg`} alt={product.title} />
                        <p>{product.title}</p>                        
                    </a>
                    <b>{product.price}</b>
                    <button className="btn btn-primary" onClick={(e)=>addCart(e, product)}>Add to cart</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Products
