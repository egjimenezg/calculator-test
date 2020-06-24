import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | operation-solver', function(hooks) {
  setupTest(hooks);

  test('should execute consecutive sums', function(assert){
    let service = this.owner.lookup('service:operation-solver');

    assert.strictEqual(service.solve('10','+'), '10');
    assert.strictEqual(service.solve('20','+'), '30');
    assert.strictEqual(service.solve('50','+'), '80');
  });

  test('should execute consecutive sums and subtractions', function(assert){
    let service = this.owner.lookup('service:operation-solver');

    assert.strictEqual(service.solve('50','+'), '50');
    assert.strictEqual(service.solve('20','-'), '70');
    assert.strictEqual(service.solve('15','+'), '55');

  });

});
