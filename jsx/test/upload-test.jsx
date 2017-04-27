import { describe, it } from 'mocha';

import React from 'react';
import chai from 'chai'
import { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';


import { UploadFile } from '../upload';

chai.use(chaiEnzyme());

describe('<UploadFile />', () => {

    it('renders a form', () => {
        const wrapper = shallow(<UploadFile />);
        const instance = wrapper.instance();
        const form = wrapper.find('form');
        expect(form).to.have.length(1);
        expect(form).to.have.prop('encType').equal('multipart/form-data');
   });

    it('renders a file selection input', () => {
        const wrapper = shallow(<UploadFile />);
        const instance = wrapper.instance();
        const form = wrapper.find('input[type="file"]');
        expect(form).to.have.length(1);
   });

    it('renders a submit button', () => {
        const wrapper = shallow(<UploadFile />);
        const instance = wrapper.instance();
        const form = wrapper.find('input[type="submit"]');
        expect(form).to.have.length(1);
   });
    
});
