import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SimpleMDE from 'simplemde';

class NewIdea extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log("MOUNTED!");
    var simplemde = new SimpleMDE({ forceSync: true });
  }

  onSubmit(e) {
    e.preventDefault();
    if (!title.value.trim()){
      return;
    }

    this.props.onAddIdea(title.value, body.value);
  }

  render() {

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input ref={node => { this.title = node }} type="text" className="form-control" id="title" placeholder="Title"/>
          </div>
          <div className="">
            <label htmlFor="body">Body</label>
            <textarea ref={node => { this.body = node }}  id="body" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Add Idea</button>
        </form>
      </div>
    )
  }
}


export default NewIdea;
