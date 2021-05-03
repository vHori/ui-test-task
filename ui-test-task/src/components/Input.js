import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type = 'text', placeholder, name, value, onChange, error }) => {
  let className = error ? "input is-danger" : (type === 'checkbox') ? 'checkbox' : 'input';
  return(
    <div className="mb-5">
      <label htmlFor={name}>{placeholder}</label>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {error && <div className="has-text-danger-dark">{error}</div>}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onChange: PropTypes.func.isRequired
}

export default Input;
