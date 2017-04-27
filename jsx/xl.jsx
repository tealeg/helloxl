import React from 'react';
import { UploadFile } from './upload';


export class XLApp extends React.Component {
    
    constructor(props) {
	super(props);
	this.state = {
	    spreadsheet: null
	}
	this.handleLoadFile = this.handleLoadFile.bind(this);
    }

    handleLoadFile(spreadsheetJSON) {
	this.setState({spreadsheet: spreadsheetJSON});
    }

    render () {
	return (
	    <div>
		<p>Hello React!</p>
		<UploadFile onLoadFile={this.handleLoadFile}/>
		{ this.state.spreadsheet &&
		  this.state.spreadsheet.Sheets.map(
		      (sheet) => <Sheet sheet={sheet} key={sheet}></Sheet>)
		}
	    </div>
	);
    }
}



function Sheet(props) {
    const rows = props.sheet.map((row) => <Row row={row} key={row}></Row>);
    return <div className="sheet">{ rows }</div>;
}

function Row(props) {
    const cols = props.row.map((col) => <Column col={col} key={col}></Column>);
    return <div className="row">{ cols }</div>;
}

function Column(props) {
    return <span className="col">{props.col}</span>;
}


