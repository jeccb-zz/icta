import React, { Component, PropTypes } from 'react';
import SimpleMDE from 'simplemde';
import { Translate, I18n } from 'react-redux-i18n';

import ReactMarkdown from 'react-markdown';

class NewIdea extends React.Component {

  constructor(props) {
    super(props);
    this.state = { acceptedTerms: false }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleTermsChange = this.handleTermsChange.bind(this);
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

  handleTermsChange(e) {
    this.setState({
      ...this.state,
      acceptedTerms: e.target.checked,
    });
  }

  render() {
    const termsUrl = window.termsUrl;

    const TermsCheck = ({handleTermsChange, termsUrl, acceptedTerms}) => (
      <label>
        <input
          type="checkbox"
          onChange={handleTermsChange}
          checked={acceptedTerms}
        />&nbsp;
        <Translate value="idea.terms" url={termsUrl} dangerousHTML />
      </label>
    );

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
          <div className="row">
            <div className="col-xs-12 col-lg-8">
              {termsUrl !== "" ?
                  <TermsCheck
                    handleTermsChange={this.handleTermsChange}
                    termsUrl={this.termsUrl}
                    acceptedTerms={this.state.acceptedTerms}
                  /> : ''}
            </div>
            <div className="col-xs-12 col-lg-3 pull-right">
              <button type="submit" className="btn btn-primary pull-right" disabled={termsUrl !== '' && !this.state.acceptedTerms} ><Translate value='idea.new' /></button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}


export default NewIdea;
