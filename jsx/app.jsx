import React from 'react';
import { render } from 'react-dom';

class UploadFile extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    file: null,
	}
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.change = this.change.bind(this);
    }

    handleChange(event) {
	this.setState({
	    file: event.target.files[0],
	});
    }

    change(spreadsheet) {
	spreadsheet.json().then((result) => {
	    this.props.onLoadExcel(result);
	});
    }


    sendData() {
	var formData  = new FormData();
	formData.append("file", this.state.file, this.state.file.name);

	fetch("/api/conversion", {
	    method: 'POST',
	    body: formData
	}).then(this.change).catch(function (error) {
	    console.log(error);
	});
    }

    handleSubmit(event) {
	event.preventDefault();
	this.sendData();
    }

    render() {
	return (
	    <form encType="multipart/form-data" onChange={this.handleChange} onSubmit={this.handleSubmit}>
		<input type="file" name="uploadfile" />
		<input type="submit" value="upload" />
	    </form>
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

class App extends React.Component {
    
    constructor(props) {
	super(props);
	this.state = {
	    spreadsheet: null
	}
	this.handleLoadExcel = this.handleLoadExcel.bind(this);
    }

    handleLoadExcel(spreadsheetJSON) {
	this.setState({spreadsheet: spreadsheetJSON});
    }

    render () {
	return (
	    <div>
		<p>Hello React!</p>
		<UploadFile onLoadExcel={this.handleLoadExcel}/>
		{ this.state.spreadsheet &&
		  this.state.spreadsheet.Sheets.map((sheet) => <Sheet sheet={sheet} key={sheet}></Sheet>) }
	    </div>
	);
    }
}

render(<App/>, document.getElementById('app'));



