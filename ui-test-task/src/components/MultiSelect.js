import React from 'react';
import PropTypes from 'prop-types';
import { Multiselect } from 'multiselect-react-dropdown'

const MultiSelect = ({ name, value, onSelect, placeholder, choices, error }) => {
  return(
    <div className="mb-5">
      <label>{placeholder}</label>
      <div className={error ? "select is-fullwidth is-danger" : "select is-fullwidth"}>
        <Multiselect
          name={name}
          value={value}
          options={choices}
          displayValue='label'
          onSelect={onSelect}
        />
        {error && <div className="has-text-danger-dark">{error}</div>}
      </div>
    </div>
  );
}

MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  choices: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  })).isRequired,
  error: PropTypes.string
}

export default MultiSelect;