/*
function hasError(field) {
  // Don't validate submits, buttons, file and reset inputs, and disabled fields.
  if (field.disabled || 'file' === field.type || 'reset' === field.type || 'submit' === field.type || 'button' === field.type)
    return null;

  let validity = field.validity;

  if (validity.valid)
    return null;

  // If field is required and empty
  if (validity.valueMissing)
    return 'Please fill out this field.';

  // If not the right type
  if (validity.typeMismatch) {
    // Email
    if (field.type === 'email')
      return 'Please enter a correct email address.';

    // URL
    if (field.type === 'url')
      return 'Please enter a correct URL.';

    return 'Please use the correct input type.';
  }

  // If too short
  if (validity.tooShort)
    return 'Please lengthen this text.';

  // If too long
  if (validity.tooLong)
    return 'Please shorten this text.';

  // If number input isn't a number
  if (validity.badInput)
    return 'Please enter a number.';

  // If a number value doesn't match the step interval
  if (validity.stepMismatch)
    return 'Please select a valid value.';

  // If a number field is over the max
  if (validity.rangeOverflow)
    return 'Please select a smaller value.';

  // If a number field is below the min
  if (validity.rangeUnderflow)
    return 'Please select a larger value.';

  // If pattern doesn't match
  if (validity.patternMismatch)
    return 'Please match the requested format.';

  // If all else fails, return a generic catchall error.
  return 'The value you entered for this field is invalid.';
}

function getErrorFields(fields) {
  let errors = fields.map(field => {
    return {
      id: field.id,
      message: hasError(field)
    };
  });

  return errors;
}

export {
  hasError,
  getErrorFields
};
*/
