import React, { Component } from 'react'

export class Filter extends Component {
    render() {
        return (
            <div className="row">
            <div className="col-md-4">
            Size : <select onChange={this.props.changeSize} className="form-control">
                <option value="">All</option>
                <option value="X">X</option>
                <option value="L">L</option>
            
            </select>
            </div>
            <div className="col-md-4">
            Sort : <select onChange={this.props.handleSort} className="form-control">
                <option value="">select</option>
                <option value="lowestprice">lowest price</option>
                <option value="highestprice">highest price</option>
            </select>
            </div>
            </div>
        )
    }
}

export default Filter
