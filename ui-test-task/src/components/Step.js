import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import RadioGroup from './RadioGroup';
import MultiSelect from './MultiSelect';


const Step = ({ data, onChange, onSelect, onStepChange, errors, stepKey, step, onPrevStep }) => {
  let output = [];

  for(const [key, val] of Object.entries(data)) {
    if(val.type.split(':')[0] === 'input') {
      output.push(<Input
        key={key}
        placeholder={val.placeholder}
        name={key}
        value={val.value}
        onChange={(e) => onChange(stepKey, e)}
        error={errors[key]}
        type={val.type.split(':')[1]}
      />);
    }else if(val.type === 'multiSelect') {
      output.push(<MultiSelect
        key={key}
        placeholder={val.placeholder}
        name={key}
        value={val.value}
        onSelect={(e) => onSelect(stepKey, e)}
        error={errors[key]}
        choices={val.choices}
      />);
    }else if(val.type === 'radioGroup') {
      output.push(<RadioGroup
        key={key}
        name={key}
        value={val.value}
        onChange={(e) => onChange(stepKey, e)}
        error={errors[key]}
        choices={val.choices}
      />);
    }
  }

  return(
    <Fragment>
      {step === 1 && <h1 className="is-size-2 has-text-centered mb-4">General Info</h1>}
      {step === 2 && <h1 className="is-size-2 has-text-centered mb-4">Contact Info</h1>}
      {step === 3 && <h1 className="is-size-2 has-text-centered mb-4">Billing Info</h1>}
      {output}
      {step > 1 && <button type="button" className="button is-warning mr-2" onClick={() => onPrevStep(step - 1)}>Go back</button>}
      <button type="button" className="button is-link" onClick={(e) => onStepChange(data, e)}>Next</button>
    </Fragment>
  );
}

Step.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onStepChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  stepKey: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  onPrevStep: PropTypes.func
}

export default Step;