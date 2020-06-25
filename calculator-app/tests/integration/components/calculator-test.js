import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Calculator />`);
    assert.equal(this.element.textContent.trim().replace(/\s+/g,' '), '0 0 1 2 3 4 5 6 7 8 9 . + - X / =');
  });

  test('it concatenate numbers and add them in display screen', async function(assert) {
    await render(hbs`<Calculator />`);
    await click('#button-9');
    await click('#button-6');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '96', 'Numbers are added to display screen');
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

  test('it sums two numbers using sum button', async function(assert){
    await render(hbs`<Calculator />`);
    await click('#button-9');
    await click('#button-0');
    await click('#sum-button');
    await click('#button-3');
    await click('#button-0');
    await click('#equal-button');

    assert.equal(this.element.querySelector('.display').textContent.trim(), '120', 'Sum of 90 and 30 will display 120');
  });

  test('it sums two numbers and multiply by another', async function(assert){
    await render(hbs`<Calculator />`);
    await click('#button-3');
    await click('#button-5'); 
    await click('#sum-button');
    await click('#button-1');
    await click('#button-0');
    await click('#multiply-button');
    await click('#button-2');
    await click('#equal-button');

    assert.equal(this.element.querySelector('.display').textContent.trim(), '90', 'Operation (35+10)*2 should display 90');
  });

});
