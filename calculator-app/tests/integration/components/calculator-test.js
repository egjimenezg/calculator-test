import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Calculator />`);
    assert.equal(this.element.textContent.trim().replace(/\s+/g,' '), '1 2 3 4 5 6 7 8 9');
  });

  test('it concatenate numbers and add them in display screen', async function(assert) {
    await render(hbs`<Calculator />`);
    await click('#button-9');
    await click('#button-6');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '96','Numbers are added to display screen');
  });

  test('it adds decimal point to display screen only once', async function(assert) {
    await render(hbs`<Calculator />`);
    await click('#button-2');
    await click('#button-0');
    await click('#decimal-point');
    await click('#decimal-point');
    await click('#button-5');

    assert.equal(this.element.querySelector('.display').textContent.trim(), '20.5', 'Decimal point can be added only once');
  });

});
