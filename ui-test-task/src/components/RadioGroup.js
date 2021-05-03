import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = ({ type = 'radio', name, onChange, error, choices }) => {
  return(
    <div className="mb-5">
      {choices.map((choice, index) => (
        <label key={index} className={type}>
          <input
            type={type}
            name={name}
            value={choice.value}
            onClick={onChange}
          />
          {choice.label}
        </label>
      ))}
      {error && <div className="has-text-danger-dark">{error}</div>}
    </div>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  })).isRequired,
  error: PropTypes.string
}

export default RadioGroup;