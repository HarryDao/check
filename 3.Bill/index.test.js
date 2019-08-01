const { expect } = require('chai');
const Bill = require('./index');
const {
  isEmployee,
  isAffiliate,
  isOver2Years,
  bigBillDiscountAmount,
  bigBillDiscount,
} = require('./discounts');

const billNormal = 80;
const billBig = 250;
const hasGroceries = 60;
const cases = [
  {
    key: `IS big bill`,
  },
  {
    key: 'IS having groceries',
  },
  {
    key: 'IS employee',
    fn: (bill, groceries) => (bill - groceries) * isEmployee,
    prop: 'isEmployee',
  },
  {
    key: 'IS affiliate',
    fn: (bill, groceries) => (bill - groceries) * isAffiliate,
    prop: 'isAffiliate',
  },
  {
    key: 'IS over 2 years',
    fn: (bill, groceries) => (bill - groceries) * isOver2Years,
    prop: 'isOver2Years'
  }
];

const discountByAmount = (bill) => Math.floor(bill / bigBillDiscountAmount) * bigBillDiscount;
const isNot = (text) => text.replace('IS', 'IS NOT');
const runCase = (number) => {
  let testBill = new Bill();
  let bill = billNormal;
  let groceries = 0;
  let text = `Case ${number + 1}: `;
  let discounts = [0];
  let amountDiscount = discountByAmount(bill);

  for (let {key, fn, prop} of cases) {
    if (number % 2) {
      text += `${key};`;
      if (key === `IS big bill`) {
        bill = billBig;
        amountDiscount = discountByAmount(bill);
      }
      else if (key === 'IS having groceries') {
        groceries = hasGroceries;
      }
      else {
        discounts.push(fn(bill, groceries));
        testBill[prop]();
      }
    }
    else {
      text += `${isNot(key)};`;
    }

    number = Math.floor(number / 2);
  }

  testBill = testBill.findNetPayable(bill, groceries);
  bill = bill - amountDiscount - Math.max(...discounts);

  return {
    text,
    testBill,
    bill
  }
}

describe('Assignment 3:', function() {
  const maxCases = 2 ** (cases.length + 1);

  for (let i = 0; i < maxCases; i ++) {
    const { text, testBill, bill } = runCase(i);
    it(text, function() {
      expect(bill).to.equal(testBill);
    });
  }
});