import { describe, it } from 'mocha';

import React from 'react';
import chai from 'chai'
import { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import { XLApp } from '../xl';
import { UploadFile } from '../upload';

chai.use(chaiEnzyme())


describe('<XLApp />', () => {

    it('has a greeting paragraph', () => {
	const wrapper = shallow(<XLApp />);
	expect(wrapper).to.contain(<p>Hello React!</p>);
    });
    
    it('has an UploadFile component', () => {
	const wrapper = shallow(<XLApp />);
	expect(wrapper).to.contain(<UploadFile onLoadFile={wrapper.instance().handleLoadFile}/>);
    });

    it('stores the JSON result passed by onLoadFile', () => {
	const wrapper = shallow(<XLApp />);
	wrapper.instance().handleLoadFile({'Sheets': [[[1]]]});
	expect(wrapper).to.have.state('spreadsheet');
	const spreadsheet = wrapper.state()['spreadsheet'];
	expect(spreadsheet['Sheets']).to.have.length(1);
	const sheets = spreadsheet['Sheets'];
	expect(sheets[0]).to.have.length(1);
	const rows = sheets[0];
	expect(rows[0]).to.have.length(1);
	const cols = rows[0];
	expect(cols[0]).to.equal(1);

    });

});

