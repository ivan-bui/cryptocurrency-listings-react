import React, { Component } from 'react';

class SearchListings extends Component {
    render() {
        return (
            <div>
                <input
                    id="SearchListings"
                    type="text"
                    className="form-control"
                    aria-label="Search Listings"
                    onChange={e => this.props.searchListings(e.target.value)}
                />
            </div>
        );
    }
}

export default SearchListings;