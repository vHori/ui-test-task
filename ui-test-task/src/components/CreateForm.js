import React, { useState } from 'react';
import { Redirect } from 'react-router'

import Step from './Step';
import Preview from './Preview';
import validate from '../helpers/validate';

const CreateForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    stepOne: {
      bankCode: {
        value: '',
        required: true,
        minLength: 3,
        maxLength: 10,
        type: 'input',
        placeholder: 'Bank Code'
      },
      bankName: {
        value: '',
        required: true,
        maxLength: 50,
        type: 'input',
        placeholder: 'Bank Name'
      },
      bankURL: {
        value: '',
        required: true,
        url: true,
        type: 'input',
        placeholder: 'Bank URL'
      },
      bankCountry: {
        value: '',
        required: true,
        minLength: 3,
        maxLength: 3,
        numberOnly: true,
        type: 'input',
        placeholder: 'Country'
      },
      schemes: {
        value: '',
        required: true,
        type: 'multiSelect',
        placeholder: 'Card Schemes',
        choices: [
          { value: 'Visa', label: 'Visa' },
          { value: 'MasterCard', label: 'MasterCard' },
          { value: 'JCB', label: 'JCB' }
        ]
      }
    },
    stepTwo: {
      contactName: {
        value: '',
        maxLength: 50,
        required: true,
        type: 'input',
        placeholder: 'Contact Name'
      },
      contactEmail: {
        value: '',
        maxLength: 100,
        mail: true,
        required: true,
        type: 'input',
        placeholder: 'Contact Email'
      },
      contactNumber: {
        value: '',
        maxLength: 20,
        phone: true,
        required: true,
        type: 'input',
        placeholder: 'Contact Number'
      },
      preferredMethod: {
        value: '',
        type: 'radioGroup',
        required: true,
        choices: [
          { value: 'Email', label: 'Email' },
          { value: 'Phone', label: 'Phone' }
        ]
      }
    },
    stepThree: {
      startDate: {
        value: '',
        required: true,
        type: 'input:date',
        placeholder: 'Bank Code'
      },
      billingPeriod: {
        value: '',
        type: 'radioGroup',
        required: true,
        choices: [
          { value: 'Monthly', label: 'Monthly' },
          { value: 'Quarterly', label: 'Quarterly' },
          { value: 'Annually', label: 'Annually' }
        ]
      },
      billingEmail: {
        value: '',
        maxLength: 100,
        mail: true,
        required: true,
        type: 'input',
        placeholder: 'Billing Email'
      },
      sameCheckbox: {
        value: '',
        type: 'input:checkbox',
        placeholder: 'Same as Contact Email'
      },
    }
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (step, e) => {
    console.log(e);
    e.persist();

    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [e.target.name]: {
          ...prev[step][e.target.name],
          value: e.target.value
        }
      }
    }));
  };

  const selectHandler = (step, e) => {
    let values = [];
    for(let key in e) {
      values.push(e[key].value);
    }

    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ['schemes']: {
          ...prev[step]['schemes'],
          value: values
        }
      }
    }));
  };

  const stepChangeHandler = (values, e) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0) {
      setStep(step + 1);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    alert('Bank was successfully created.');
    setSubmitted(true);

    const data = new FormData();
    data.append('bankCode', formData.stepOne.bankCode.value);
    data.append('bankName', formData.stepOne.bankName.value);
    data.append('bankURL', formData.stepOne.bankURL.value);
    data.append('bankCountry', formData.stepOne.bankCountry.value);
    data.append('schemes', formData.stepOne.schemes.value);
    data.append('contactName', formData.stepTwo.contactName.value);
    data.append('contactEmail', formData.stepTwo.contactEmail.value);
    data.append('contactNumber', formData.stepTwo.contactNumber.value);
    data.append('preferredMethod', formData.stepTwo.preferredMethod.value);
    data.append('startDate', formData.stepThree.startDate.value);
    data.append('billingPeriod', formData.stepThree.billingPeriod.value);
    data.append('billingEmail', formData.stepThree.billingEmail.value);
    data.append('sameCheckbox', formData.stepThree.sameCheckbox.value);

    // In here you can send data to some api
    // For example if you have some redux action: sendData(data)
  }

  if(submitted) {
    return <Redirect push to={{
      pathname: '/v1/banks/page=1'
    }}
    />
  }

  return(
    <div className="container pt-5">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <form onSubmit={submitHandler}>
            <a href="/v1/banks/page=1">Banks</a>
            {step === 1 && <Step
              data={formData.stepOne}
              onChange={changeHandler}
              onSelect={selectHandler}
              onStepChange={stepChangeHandler}
              errors={errors}
              stepKey="stepOne"
              step={1}
            />}
            {step === 2 && <Step
              data={formData.stepTwo}
              onChange={changeHandler}
              onStepChange={stepChangeHandler}
              errors={errors}
              stepKey="stepTwo"
              onPrevStep={(step) => setStep(step)}
              step={2}
            />}
            {step === 3 && <Step
              data={formData.stepThree}
              onChange={changeHandler}
              onStepChange={stepChangeHandler}
              errors={errors}
              stepKey="stepThree"
              onPrevStep={(step) => setStep(step)}
              step={3}
            />}
            {step === 4 && <Preview
              onPrevStep={() => setStep(step - 1)}
              data={[
                { label: 'Bank Code', value: formData.stepOne.bankCode.value },
                { label: 'Bank Name', value: formData.stepOne.bankName.value },
                { label: 'Bank URL', value: formData.stepOne.bankURL.value },
                { label: 'Bank Country', value: formData.stepOne.bankCountry.value },
                { label: 'Card Schemes', value: formData.stepOne.schemes.value },
                { label: 'Contact Name', value: formData.stepTwo.contactName.value },
                { label: 'Contact Email', value: formData.stepTwo.contactEmail.value },
                { label: 'Contact Number', value: formData.stepTwo.contactNumber.value },
                { label: 'Preferred Method', value: formData.stepTwo.preferredMethod.value },
                { label: 'Start Date', value: formData.stepThree.startDate.value },
                { label: 'Billing Period', value: formData.stepThree.billingPeriod.value },
                { label: 'Billing Email', value: formData.stepThree.billingEmail.value },
              ]}
            />}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateForm;