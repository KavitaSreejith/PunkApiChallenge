import React, { Component } from "react";
import axios from 'axios';
import AutoSuggestion from "../autosuggestion/index";
import SearchResult from "../search-results/index";
var _ = require('lodash');
import '../../styles/styles.less';

class SearchEnquiry extends Component {

    constructor(props) {
        super(props);
        this.state = { randomBeer: [] ,
                       allBeers: [], 
                       allBeersWithName: [],
                       getAllBeers : 'https://api.punkapi.com/v2/beers',
                       isNameOrDesc: '',
                       nameList:[],
                       descList:[],
                       selectedBeerWithName :[],
                       selectedBeerWithDesc :[]            
                     };
    }

    componentDidMount() {
        fetch(this.state.getAllBeers)
            .then(response => response.json())
            .then(allBeers => this.setState({ allBeers },
                () => {}
            ))
    }

    // Pick the Beer Name list from allbeers result..
    categorizeByName(){
        document.getElementById("autocomplete-text").value = "";
        this.setState(
            {nameList: _.map(this.state.allBeers, 'name'),
             isNameOrDesc: 'name'
        },
            () => {}
        )
    }

    // Pick the Beer Description list from allbeers result..
    categorizeByDesc(){
        document.getElementById("autocomplete-text").value = "";
        this.setState(
            {descList: _.map(this.state.allBeers, 'description'),
             isNameOrDesc: 'desc'
        },
            () => {}
        )
    }

    // Set the Current Selected Beer..
    setBeer(currentBeerName){
        this.setState(
            {selectedBeerWithName: _.filter(currentBeerName, item => item.name )
        },
        () => {});
    }

    // To Clear the Input..
    clearField() {
        document.getElementById("autocomplete-text").value = "";
    }

    // 
    getResult(){
        const beerName = (document.getElementById("autocomplete-text").value).split(' ').join('_') ;
        const { allBeersWithName } = this.state;
        fetch('https://api.punkapi.com/v2/beers?beer_name='+beerName)
            .then(response => response.json())
            .then(allBeersWithName => this.setState({ allBeersWithName },
                () => {
                    this.setBeer(this.state.allBeersWithName);
                }
            ))

        // Select the Beers deatils which matched the user input..    
        this.setState(
            {selectedBeerWithName: _.filter(this.state.allBeers, item => ( item.name )== document.getElementById("autocomplete-text").value),
            selectedBeerWithDesc: _.filter(this.state.allBeers, item => ( item.description )== document.getElementById("autocomplete-text").value)
        },
        () => {});
    }

    render() {
        const { nameList, descList, isNameOrDesc, selectedBeerWithName, selectedBeerWithDesc } = this.state;
        return (
           <div className="search-enquiry">
                <div className="search-enquiry__header"> Search for your favourite beer </div>
                <div className="search-enquiry__controls">
                    <input type="radio" name="name" value="name" onChange={ () => this.categorizeByName() } id="name"/> <label className="name-label" htmlFor="name">By Name</label>
                    <input type="radio" name="name" value="description" onChange={ () => this.categorizeByDesc() } id="desc"/> <label htmlFor="desc">By Description</label>
                    <span className="action">
                        <button onClick={ () => this.clearField() } className="clear-input">
                            Clear Input
                        </button>  
                        <button id="getResult" onClick={ () => this.getResult() } className="search">
                            Search Result
                        </button>
                    </span>
                </div>
                <div className="search-enquiry__input">
                    <AutoSuggestion
                        suggestions={(isNameOrDesc=='name') ? nameList : descList}
                    />
                </div>

                {(selectedBeerWithName || selectedBeerWithDesc) ? (<SearchResult selectedBeer={ (isNameOrDesc=='name') ? selectedBeerWithName : selectedBeerWithDesc} />) : ''}
          </div>
        );
    }
}

export default SearchEnquiry;

