export const incrementCounter = (index) => ({
    type: 'INCREMENT_COUNTER',
    payload: { index },
  });
  
  export const decrementCounter = (index) => ({
    type: 'DECREMENT_COUNTER',
    payload: { index },
  });
  export const inputVoucher = (inputVal) => ({
    type: 'INPUT_VOUCHER',
    payload: { inputVal },
  });
  export const applyVoucher = (index) => ({
    type: 'APPLY_VOUCHER',
  });