import React from 'react';
import Form from './Form';

const PurchaseForm = () => {
  const handleSubmit = (values) => {
    const { price, quantity } = values;
    // TODO: Send info to assignment-server
    console.log(values);

    // TODO: Make this a modal box with a confirm / cancel button
    alert(`A new purchase assignment was placed: ${quantity} units @ $${price}`);
  };

  return (
    <Form type="Purchase" onSubmit={handleSubmit} />
  );
};

export default PurchaseForm;
