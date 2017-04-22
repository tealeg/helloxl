import React from 'react';
import {render} from 'react-dom';

class UploadFile extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    file: null,
	}
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
	this.setState({
	    file: event.target.files[0],
	});
    }


    sendData() {
	var formData  = new FormData();
	formData.append("file", this.state.file, this.state.file.name);

	fetch("/api/conversion", {
	    method: 'POST',
	    body: formData
	}).then(function (response) {
	    console.log(response.json());
	    
	}).catch(function (error) {
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

class App extends React.Component {
    render () {
	return (
	    <div>
		<p> Hello React!</p>
		<UploadFile />
	    </div>
	);
    }
}

render(<App/>, document.getElementById('app'));



