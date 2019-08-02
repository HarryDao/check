const { expect } = require('chai');
const Bill = require('./index');
const cases = {
  normal: { amount: 250, groceries: 10, expected: 240 },
  isEmployee: { amount: 250, groceries: 10, expected: 168, expectedWithoutGroceries: 165 },
  isAffiliate: { amount: 250, groceries: 10, expected: 216, expectedWithoutGroceries: 215 },
  isOver2Years: { amount: 250, groceries: 10, expected: 228, expectedWithoutGroceries: 227.5 }
}

describe('Assignment 3:', function() {
  let bill;
  
  beforeEach(function() {
    bill = new Bill();
  });


  describe('Given normal client without any percentage discount:', function() {
    it('when no groceries, should return correct bill after amount discount', function() {
      const { amount, expected } = cases.normal;
      expect(bill.findNetPayable(amount)).to.be.equal(expected);
    });

    it ('when having groceries, should return correct bill after amount discount', function() {
      const { amount, groceries, expected } = cases.normal;
      expect(bill.findNetPayable(amount, groceries)).to.be.equal(expected);      
    });
  });

  describe('Given client with 1 percentage discount', function() {
    describe('When client is employee', function() {
      beforeEach(function() {
        bill.isEmployee();
      });

      it('when no groceries, should return correct bill', function() {
        const { amount, expectedWithoutGroceries } = cases.isEmployee;
        expect(bill.findNetPayable(amount)).to.be.equal(expectedWithoutGroceries);
      });

      it('when having groceries, should return correct bill', function() {
        const { amount, groceries, expected } = cases.isEmployee;
        expect(bill.findNetPayable(amount, groceries)).to.be.equal(expected);
      });
    });

    describe('When client is affiliate', function() {
      beforeEach(function() {
        bill.isAffiliate();
      });

      it('when no groceries, should return correct bill', function() {
        const { amount, expectedWithoutGroceries } = cases.isAffiliate;
        expect(bill.findNetPayable(amount)).to.be.equal(expectedWithoutGroceries);
      });

      it('when having groceries, should return correct bill', function() {
        const { amount, groceries, expected } = cases.isAffiliate;
        expect(bill.findNetPayable(amount, groceries)).to.be.equal(expected);
      });
    });

    describe('When client is over 2 years', function() {
      beforeEach(function() {
        bill.isOver2Years();
      });

      it('when no groceries, should return correct bill', function() {
        const { amount, expectedWithoutGroceries } = cases.isOver2Years;
        expect(bill.findNetPayable(amount)).to.be.equal(expectedWithoutGroceries);
      });

      it('when having groceries, should return correct bill', function() {
        const { amount, groceries, expected } = cases.isOver2Years;
        expect(bill.findNetPayable(amount, groceries)).to.be.equal(expected);
      });
    });
  }); 

  describe('Given client with multiple percentage discounts', function() {
    
    describe('When having 2 discounts', function() {
      
      describe('when is employee and is affiliate, should pick only employee discount, and return correct bill', function() {
        beforeEach(function() {
          bill.isEmployee();
          bill.isAffiliate();
        });

        it('when no groceries, should return correct bill', function() {
          const { amount, expectedWithoutGroceries } = cases.isEmployee;
          expect(bill.findNetPayable(amount)).to.be.equal(expectedWithoutGroceries);
        });
  
        it('when having groceries, should return correct bill', function() {
          const { amount, groceries, expected } = cases.isEmployee;
          expect(bill.findNetPayable(amount, groceries)).to.be.equal(expected);
        });
      });

      describe('when is employee and is over 2 years, should pick only employee discount, and return correct bill', function() {
        beforeEach(function() {
          bill.isEmployee();
          bill.isOver2Years();
        });

        it('when no groceries, should return correct bill', function() {
          const { amount, expectedWithoutGroceries } = cases.isEmployee;
          expect(bill.findNetPayable(amount)).to.be.equal(expectedWithoutGroceries);
        });
  
        it('when having groceries, should return correct bill', function() {
          const { amount, groceries, expected } = cases.isEmployee;
          expect(bill.findNetPayable(amount, groceries)).to.be.equal(expected);
        });
      }); 
      
      describe('when is affiliate and is over 2 years, should pick only affiliate discount, and return correct bill', function() {
        beforeEach(function() {
          bill.isAffiliate();
          bill.isOver2Years();
        });

        it('when no groceries, should return correct bill', function() {
          const { amount, expectedWithoutGroceries } = cases.isAffiliate;
          expect(bill.findNetPayable(amount)).to.be.equal(expectedWithoutGroceries);
        });
  
        it('when having groceries, should return correct bill', function() {
          const { amount, groceries, expected } = cases.isAffiliate;
          expect(bill.findNetPayable(amount, groceries)).to.be.equal(expected);
        });
      }); 
    });

    describe('When having 3 discounts, should pick employee discount, and return correct bill', function() {
      beforeEach(function() {
        bill.isEmployee();
        bill.isAffiliate();
        bill.isOver2Years();
      });

      it('when no groceries, should return correct bill', function() {
        const { amount, expectedWithoutGroceries } = cases.isEmployee;
        expect(bill.findNetPayable(amount)).to.be.equal(expectedWithoutGroceries);
      });

      it('when having groceries, should return correct bill', function() {
        const { amount, groceries, expected } = cases.isEmployee;
        expect(bill.findNetPayable(amount, groceries)).to.be.equal(expected);
      });
    });
  });
});