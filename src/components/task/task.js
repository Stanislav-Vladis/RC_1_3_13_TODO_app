import React from 'react';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    timeOfCreated: PropTypes.string,
    isChecked: PropTypes.bool,
    onEditing: PropTypes.func,
    onCompleted: PropTypes.func,
    onDestroy: PropTypes.func
  };

  render() {
    const { description, timeOfCreated, isChecked, onEditing, onCompleted, onDestroy } = this.props;

    return (
      <div className="view">
        <input id="toggleCheckbox" className="toggle" type="checkbox" checked={isChecked} onChange={onCompleted} />
        <label htmlFor="toggleCheckbox">
          <span className="description">{description}</span>
          <span className="created">{timeOfCreated}</span>
        </label>
        <button className="icon icon-edit" onClick={onEditing}></button>
        <button className="icon icon-destroy" onClick={onDestroy}></button>
      </div>
    );
  }
}
