import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SimpleMDE from 'simplemde';
import { Translate, I18n } from 'react-redux-i18n';

import ReactMarkdown from 'react-markdown';
class NewIdea extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
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
      <div className="col-sm-12">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title"><Translate value='idea.title' /></label>
            <input ref={node => { this.title = node }} type="text" className="form-control" id="title" placeholder={I18n.t('idea.title')} />
          </div>
          <div className="form-group">
            <label htmlFor="body"><Translate value='idea.body' /></label>
            <textarea ref={node => { this.body = node }}  id="body" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary pull-right"><Translate value='idea.new' /></button>
        </form>
      </div>
    )
  }
}


export default NewIdea;
