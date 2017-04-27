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
	const sheet = {SheetID: 0, MaxCols: 0, MaxRows: 0, Rows: []};
	wrapper.instance().handleLoadFile({'Sheets': [sheet]});
	expect(wrapper).to.have.state('spreadsheet');
	const spreadsheet = wrapper.state()['spreadsheet'];
	expect(spreadsheet['Sheets']).to.have.length(1);
	const sheetObj = spreadsheet['Sheets'][0];
	expect(sheetObj.SheetID).to.equal(0);
	expect(sheetObj.MaxCols).to.equal(0);
	expect(sheetObj.MaxRows).to.equal(0);
	expect(sheetObj.Rows).to.have.length(0);
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


