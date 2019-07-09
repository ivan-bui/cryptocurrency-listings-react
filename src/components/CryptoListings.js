import React from 'react';
import { FaSort } from 'react-icons/fa';
import Moment from 'react-moment';

class CryptoListings extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(_column) {
        this.props.sortBy(_column);
    }

    render() {
        let key = this.props.currency;
        return (
            <table>
                <thead>
                    <tr>
                        <th onClick={() =>
                            this.handleClick('name')
                        }>Name <FaSort /></th>
                        <th onClick={() =>
                            this.handleClick('symbol')
                        }>Symbol <FaSort /> </th>
                        <th onClick={() =>
                            this.handleClick('price')
                        }>Price <FaSort /></th>
                        <th onClick={() =>
                            this.handleClick('last_updated')
                        }>Last Updated <FaSort /></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.listings.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.symbol}</td>
                            <td>{Number(item.quote[key].price).toFixed(4)}</td>
                            <td>
                                <Moment
                                    date={item.last_updated}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default CryptoListings;