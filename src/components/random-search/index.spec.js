import React from 'react';
import { shallow } from 'enzyme';
import fetch from 'whatwg-fetch';
import sinon from 'sinon';
import RandomSearch from './index';


xdescribe('Random Search Container', () => {
    let wrapper;
    let getRandomBeer = sinon.spy();
    let getRandomNonAlcoholicBeer = sinon.spy();

    beforeEach( () => {
        wrapper = shallow(<RandomSearch getRandomBeer={getRandomBeer} getRandomNonAlcoholicBeer={getRandomNonAlcoholicBeer} />);
    })

    afterEach(() => {
        wrapper.unmount();
    })
    it('Component should load Properly', () => {
        expect(wrapper).toBeDefined();
    });

    it('should have getRandomBeer Button', () => {
        expect(wrapper.find('#getAnotherBeer').length).toEqual(1); 
    }); 

    it('should have getNonAlcoholicBeer Button', () => {
        expect(wrapper.find('#getNonAlcohol').length).toEqual(1); 
    }); 

    it('Check for Random Beer Call', () => {
        getRandomBeer = sinon.spy(wrapper.instance(), 'getRandomBeer');
        wrapper.update();
        wrapper.find('button').at(0).simulate('click');
        expect(getRandomBeer.called).toBe(true);
        getRandomBeer.restore();        
    });

    it('Check for Non alcoholic beer call', () => {
        getRandomNonAlcoholicBeer = sinon.spy(wrapper.instance(), 'getRandomNonAlcoholicBeer');
        wrapper.update();
        wrapper.find('#getNonAlcohol').simulate('click');
        expect(getRandomNonAlcoholicBeer.called).toBe(true);
        getRandomNonAlcoholicBeer.restore();        
    });

});
