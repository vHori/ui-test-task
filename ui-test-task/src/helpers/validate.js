const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const validateURL = url => {
  const re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return re.test(url);
}

const validatePhone = phone => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

export default (fields) => {
  let errors = {};

  for(let field in fields) {
    const currentField = fields[field];

    if(currentField.required && currentField.value === '') {
      errors[field] = 'This field is required!';
    }

    if(!errors[field] && currentField.email && !validateEmail(currentField.value)) {
      errors[field] = 'Invalid email address';
    }

    if(!errors[field] && currentField.url && !validateURL(currentField.value)) {
      errors[field] = 'Invalid url';
    }

    if(!errors[field] && currentField.phone && !validatePhone(currentField.value)) {
      errors[field] = 'Invalid phone number';
    }

    if(!errors[field] && currentField.minLength && currentField.value.trim().length < currentField.minLength) {
      errors[field] = `This field must have at least ${currentField.minLength} characters`;
    }

    if(!errors[field] && currentField.maxLength && currentField.value.trim().length > currentField.maxLength) {
      errors[field] = `This field must have above then ${currentField.maxLength} characters`;
    }

    if(!errors[field] && currentField.numberOnly && isNaN(currentField.value)) {
      errors[field] = `This field must be a number`;
    }
  }

  return errors;
}