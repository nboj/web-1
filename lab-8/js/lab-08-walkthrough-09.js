/* code goes here */
var isCanadian = true;

function calculateTax(amount, tax) {
  return amount * tax();
}

function calculateTotal(price, quantity) {
  let amount = price * quantity;
  return (
    amount +
    calculateTax(amount, () => {
      // remember : variables defined outside of a function have global scope
      if (isCanadian) {
        return 0.05;
      } else {
        return 0.0;
      }
    })
  );
}
