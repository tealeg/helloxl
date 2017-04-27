import { describe, it } from 'mocha';

import React from 'react';
import chai from 'chai'
import { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, render } from 'enzyme';

import { XLApp, Sheet, Row, Column } from '../xl';
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


describe('<Sheet />', () => {

    it('Renders a div', ()=> {
        const sheet = {SheetID: 0, MaxCols: 0, MaxRows: 0, Rows: []};
        const wrapper = shallow(<Sheet sheet={sheet} key={sheet.SheetID} />);
        expect(wrapper).to.contain(<div className="sheet" />);
    });

    it('Renders a row, per Row', () => {
        const row = {RowID: 0, Cols: []};
        const sheet = {SheetID: 0, MaxCols: 0, MaxRows: 1, Rows: [row]};
        const wrapper = shallow(<Sheet sheet={sheet} key={sheet.SheetID} />);
        expect(wrapper).to.contain(<Row row={row} key={row.RowID} />);
    });
    
});

describe('<Row />', () => {

    it('Renders a div', ()=> {
        const row = {RowID: 0, Cols: []};
        const wrapper = shallow(<Row row={row} key={row.RowID} />);
        expect(wrapper).to.contain(<div className="row" />);
    });

    it('Renders a Column, per Col', () => {
        const col = {ColID: 0, Value: "foo"};
        const row = {RowID: 0, Cols: [col]};
        const wrapper = shallow(<Row row={row} key={row.RowID} />);
        expect(wrapper).to.contain(<Column col={col} key={col.ColID} />);
    });
    
});


describe('<Column />', () => {

    it('Renders a span with a value', ()=> {
        const col = {ColID: 0, Value: "foo"};
        const wrapper = shallow(<Column col={col} key={col.ColID} />);
        expect(wrapper).to.contain(<span className="col">foo</span>);
    });
});


