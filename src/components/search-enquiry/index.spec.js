import React from 'react';
import { shallow, mount } from 'enzyme';

import SearchEnquiry from './index';
import fetch from 'whatwg-fetch';
import sinon from 'sinon';
import AutoSuggestion from '../autosuggestion/index';

xdescribe('Random Search Container', () => {
    let wrapper;
    let getResult = sinon.spy();
    let searchWrapper  = shallow(<AutoSuggestion />);
    beforeEach( () => {
        wrapper = shallow(<SearchEnquiry getResult={getResult} />);
    })

    afterEach(() => {
        wrapper.unmount();
    })
    it('Component should load Properly', () => {
        expect(wrapper).toBeDefined();
    });

    it('should have Search Button', () => {
        expect(wrapper.find('#getResult').length).toEqual(1); 
    }); 

    it('Check for getResult', () => {
        getResult = sinon.spy(wrapper.instance(), 'getResult');
        wrapper.update();
        searchWrapper.find("#autocomplete-text").toBeNull();
        wrapper.find('#getResult').simulate('click');
        expect(getResult.called).toBe(true);
        getResult.restore();  
    });
});

