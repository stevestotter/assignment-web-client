import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import './Form.scss';

const Form = ({ type, onSubmit, ...props }) => {
  const {
    register, handleSubmit, reset, formState,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmitForm = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form data-testid={`${type.toLowerCase()}-form`} className="assignment-form" onSubmit={handleSubmit(onSubmitForm)}>
      <label htmlFor="price">
        {`${type} assignment price ($):`}
        <input
          data-testid="price-input"
          type="text"
          name="price"
          ref={
            register({
              required: true,
              pattern: {
                value: /^[0-9](\.[0-9]+)?$/,
                message: 'validation failed on price', // <p>error message</p>
              },
            })
          }
        />
      </label>
      <label htmlFor="quantity">
        How many units?:
        <input
          data-testid="quantity-input"
          type="text"
          name="quantity"
          ref={
            register({
              required: true,
              pattern: {
                value: /^[0-9]+(\.[0-9]+)?$/,
                message: 'validation failed on quantity', // <p>error message</p>
              },
            })
          }
        />
      </label>
      <input type="submit" value="Submit" disabled={!formState.isValid} />
    </form>
  );
};

Form.propTypes = {
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
