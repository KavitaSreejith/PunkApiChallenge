import React, { Component } from "react";

class SearchResult extends Component {
    render() {
        return (
           <div className="search-results">
              {/* <ul> */}
                {
                    this.props.selectedBeer.map((item, key) => {
                        return (
                        <div key={key} className="search-results__content">
                                <div className="image">
                                    <img src={item.image_url} alt="Smiley face" height="100" width="35" />
                                </div>
                                <div className="detail">
                                    <div className="name">{item.name}</div>
                                    <div className="desc">{item.description}</div>
                                </div>
                        </div>)
                    })
                }
            {/* </ul> */}
          </div>
        );
    }
}


export default SearchResult;