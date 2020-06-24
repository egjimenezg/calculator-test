import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | operation-solver', function(hooks) {
  setupTest(hooks);

  test('should execute consecutive sums', function(assert){
    let service = this.owner.lookup('service:operation-solver');

    assert.strictEqual(service.calculate('10','+',false), '10');
    assert.strictEqual(service.calculate('20','+',true), '30');
    assert.strictEqual(service.calculate('50','+',true), '80');
  });



  test('should execute consecutive sum, subtraction, multiplication and division', function(assert){
    let service = this.owner.lookup('service:operation-solver');

    assert.strictEqual(service.calculate('10','+',false), '10');
    assert.strictEqual(service.calculate('10','*',true), '20');
    assert.strictEqual(service.calculate('5','/',true), '100');
    assert.strictEqual(service.getResult('100'), '1');
  });

});
