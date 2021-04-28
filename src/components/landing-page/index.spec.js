import React from 'react';
import { shallow } from 'enzyme';
import App from './index';


const wrapper = shallow(<App />);

describe('Home Container', () => {
    it('Component should load Properly', () => {
        expect(wrapper).toBeDefined();
    });
});