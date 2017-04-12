import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const NewIdea = ({onAddIdea, loading}) => {
  let title;
  let body;

  const onSubmit = e => {
    e.preventDefault();
    console.log(title.value.trim() ? true : false);
    console.log(body.value.trim());
    if (!title.value.trim()){
      return;
    }

    onAddIdea(title.value, body.value);
  };

  return (
    <div>

      <ol className="breadcrumb">
        <li><Link to="/">List</Link></li>
        <li className="active">New Idea</li>
      </ol>

      <div className="page-header">
        <h1> New Idea </h1>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input ref={node => { title = node }} type="text" className="form-control" id="title" placeholder="Title"/>
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea ref={node => { body = node }}className="form-control" id="body" ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Idea</button>
      </form>
    </div>
  )
}


export default NewIdea;
