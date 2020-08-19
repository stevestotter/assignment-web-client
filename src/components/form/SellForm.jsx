import React from 'react';
import Form from './Form';

const SellForm = () => {
  const handleSubmit = (values) => {
    const { price, quantity } = values;
    // TODO: Send info to assignment-server

    // TODO: Make this a modal box with a confirm / cancel button
    alert(`A new sell assignment was placed: ${quantity} units @ $${price}`);
  };

  return (
    <Form type="Sell" onSubmit={handleSubmit} />
  );
};

export default SellForm;
