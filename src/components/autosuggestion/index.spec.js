import React from 'react';
import { shallow } from 'enzyme';
import AutoSuggestion from './index';


const wrapper = shallow(<AutoSuggestion />);

describe('Auto Suggestion Container', () => {
    it('Component should load Properly', () => {
        expect(wrapper).toBeDefined();
    });
});