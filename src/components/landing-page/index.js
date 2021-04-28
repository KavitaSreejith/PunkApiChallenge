import React, { Component } from "react";

import '../../styles/styles.less';
import RandomSearch from '../random-search/index';
import SearchEnquiry from '../search-enquiry/index';

class App extends Component {
    render() {
        return (
            <div className="mypunk">
            <div className="mypunk__header"> Punk Beer Factory<span className="punk-icon"></span></div>
             <RandomSearch />
             <SearchEnquiry />
            </div>
        );
    }
}

export default App;