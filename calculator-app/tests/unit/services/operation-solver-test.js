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
    assert.strictEqual(service.getResult('0'), 'Error: Division by 0');
  });

  test('should fail assigning an invalid number or operator', function(assert){
    let service = this.owner.lookup('service:operation-solver');
    assert.strictEqual(service.isInputValid('',''), false);
    assert.strictEqual(service.isInputValid('abc',''), false);
    assert.strictEqual(service.isInputValid('.','+'), false);
    assert.strictEqual(service.isInputValid('0....9','.'), false);
    assert.strictEqual(service.isInputValid('000009','x'), false);
    assert.strictEqual(service.isInputValid('--99.5','*'), false);
    assert.strictEqual(service.isInputValid('-100.5','+'), true);
    assert.strictEqual(service.isInputValid('0.','*'), true);
    assert.strictEqual(service.isInputValid('000009','+'), true);
    assert.strictEqual(service.isInputValid('0.00000','+'), true);
    assert.strictEqual(service.isInputValid('5','+'), true);
    assert.strictEqual(service.isInputValid('6','-'), true);
    assert.strictEqual(service.isInputValid('999999','-'), true);
    assert.strictEqual(service.isInputValid('110.50','*'),true);
    assert.strictEqual(service.isInputValid('0.000','+'), true);
  });

});
