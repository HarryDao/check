const { expect } = require('chai');
const { store, load } = require('./');
const sample_arr = [{key1: 'value1', key2: 'value2'}, {key3: 'value3'}];
const sample_text = 'key1=value1;key2=value2\nkey3=value3\n';

describe('Assignment 1:', function() {
  it('can load() correctly', function() {
    expect(load(sample_text)).to.be.deep.equal(sample_arr);
  });

  it('can store() correctly', function() {
    expect(store(sample_arr)).to.be.equal(sample_text);
  });
});