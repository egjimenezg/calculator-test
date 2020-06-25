import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | operation-solver', function(hooks) {
  setupTest(hooks);

  test('should execute consecutive sum and subtraction', function(assert){
    let service = this.owner.lookup('service:operation-solver');
     
    service.setLeftOperandAndOperator(Number(10),'+');
    assert.strictEqual(service.calculate('10','+'), '20');
    assert.strictEqual(service.calculate('20','+'), '40');
    assert.strictEqual(service.calculate('50','+'), '90');
    
    service.cleanOperation();
      
    service.setLeftOperandAndOperator(Number(10),'+');

    assert.strictEqual(service.calculate('10','-'), '20');
    assert.strictEqual(service.calculate('5', '-'), '15');
    assert.strictEqual(service.getResult('5'), '10');
  });

  test('should execute consecutive sum, subtraction, multiplication and division', function(assert){
    let service = this.owner.lookup('service:operation-solver');

    service.setLeftOperandAndOperator(Number(10), '+');

    assert.strictEqual(service.calculate('10', '+'), '20');
    assert.strictEqual(service.calculate('10','*'), '30');
    assert.strictEqual(service.calculate('5','/'), '150');
    assert.strictEqual(service.getResult('50'), '3');
  });

  test('should fail executing a division by zero', function(assert){
    let service = this.owner.lookup('service:operation-solver');
    service.setLeftOperandAndOperator(Number(50), '/');
    assert.strictEqual(service.getResult('0'), 'Error');
  });


});
