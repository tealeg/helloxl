import React from 'react';

export class UploadFile extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    file: null,
	}
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.loadFile = this.loadFile.bind(this);
    }

    handleChange(event) {
	// Record the selected File object in our state, so we can use
	// it in sendData.
	this.setState({
	    file: event.target.files[0],
	});
    }

    loadFile(spreadsheet) {
	spreadsheet.json().then((result) => {
	    this.props.onLoadFile(result);
	});
    }

    sendData() {
	var formData  = new FormData();
	formData.append("file", this.state.file, this.state.file.name);

	fetch("/api/conversion", {
	    method: 'POST',
	    body: formData
	}).then(this.loadFile).catch(function (error) {
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
