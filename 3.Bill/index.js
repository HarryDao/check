const {
  isEmployee,
  isAffiliate,
  isOver2Years,
  bigBillDiscountAmount,
  bigBillDiscount,
} = require('./discounts');

class Bill {
  constructor() {
    this.groceries = 0;
    this.percentageDiscounts = [];
  }

  afterGroceries(bill) {
    return bill - this.groceries;
  }

  discountByAmount(bill) {
    return Math.floor(bill / bigBillDiscountAmount) * bigBillDiscount;
  }

  isEmployee() {
    this.percentageDiscounts.push((bill) => {
      return this.afterGroceries(bill) * isEmployee;
    });
  }

  isAffiliate() {
    this.percentageDiscounts.push((bill) => {
      return this.afterGroceries(bill) * isAffiliate;
    });
  }

  isOver2Years() {
    this.percentageDiscounts.push((bill) => {
      return this.afterGroceries(bill) * isOver2Years;
    });
  }

  findNetPayable(bill, groceries = 0) {
    this.groceries = groceries;
    const amountDiscount = this.discountByAmount(bill);
    const percentageDiscount = Math.max(0, ...this.percentageDiscounts.map(fn => fn(bill)));
    return bill - amountDiscount - percentageDiscount;
  }
}

module.exports = Bill;

// const bill = new Bill();
// bill.isEmployee();
// bill.isAffiliate();
// console.log(bill.findNetPayable(250, 30));
