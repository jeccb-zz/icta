import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Translate, I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';

import SimpleMDE from 'simplemde';
import ReactMarkdown from 'react-markdown';

class EditIdea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIdea: this.props.idea,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.props.getAllUsers();
  }

  componentDidMount() {
    const simplemde = new SimpleMDE({ forceSync: true });
    this.simplemde = simplemde;

    const onChangeArea = () => {
      const currentIdea = this.state.currentIdea;
      currentIdea['body'] = simplemde.value();
      this.setState({currentIdea: currentIdea});
    };

    onChangeArea.bind(this);
    simplemde.codemirror.on("change", onChangeArea);
  }

  handleFieldChange(field) {
    return (event) => {
      const currentIdea = this.state.currentIdea;
      currentIdea[field] = event.target.value;
      this.setState({currentIdea: currentIdea});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onEditIdea(this.state.currentIdea);
  }

  render() {
    const idea = this.props.idea;
    const allUsers = this.props.allUsers;

    const UsersSelect = () => (
      <select value={idea.owner.id} onChange={this.handleFieldChange('owner_id')} className="form-control">
        <option key='' value=''>Nenhum</option>
        { allUsers.map((u) => (<option key={u.id} value={u.id}> {u.name}</option>)) }
      </select>
    );

    return (
      <div className="col-sm-12">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title"><Translate value='idea.title' /></label>
            <input
              value={idea.title}
              type="text"
              className="form-control"
              placeholder={I18n.t('idea.title')}
              onChange={this.handleFieldChange('title')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="owner"><Translate value='idea.owner' /></label>
            { allUsers === 'loading' ? 'Loading' : <UsersSelect /> }
          </div>
          <div className="form-group">
            <label htmlFor="status"><Translate value='idea.status' /></label>
            <select value={idea.status} onChange={this.handleFieldChange('status')} className="form-control">
              <option value="new">{I18n.t('idea.statuses.new')}</option>
              <option value="planned">{I18n.t('idea.statuses.planned')}</option>
              <option value="in_progress">{I18n.t('idea.statuses.in_progress')}</option>
              <option value="done">{I18n.t('idea.statuses.done')}</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="body"><Translate value='idea.body' /></label>
            <textarea rows="4" value={idea.body} onChange={this.handleFieldChange('body')}></textarea>
          </div>
          <button type="submit" className="btn btn-primary pull-right"><Translate value='idea.save' /></button>
        </form>
      </div>
    )
  }
}

export default EditIdea;
