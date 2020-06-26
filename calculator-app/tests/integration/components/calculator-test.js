import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Calculator />`);
    assert.equal(this.element.textContent.trim().replace(/\s+/g,' '), '0 7 8 9 4 5 6 1 2 3 0 . x ÷ + - = C');
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

  test('it sums, subtracts, multiply and divides using the operator buttons', async function(assert){
    await render(hbs`<Calculator />`);
    await click('#button-9');
    await click('#button-0');
    await click('#sum-button');
    await click('#button-3');
    await click('#button-0');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '120', 'Sum of 90 and 30 will display 120');

    await click('#button-3');
    await click('#subtract-button');
    await click('#button-5');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '-2', '3 minus 5 will display -2');

    await click('#button-2');
    await click('#button-5');
    await click('#multiply-button');
    await click('#button-4');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '100', '25 multiplied by 4 will display 100');

    await click('#button-5');
    await click('#button-0');
    await click('#division-button');
    await click('#button-1');
    await click('#button-0');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '5', '50 divided by 10 will display 5');
  });

  test('it shows the result of consecutive operations when equal button is pressed', async function(assert){
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


  test('it clears the screen when the erase button is pressed', async function(assert){
    await render(hbs`<Calculator />`);
    await click('#button-9');
    await click('#button-0');
    await click('#multiply-button');
    await click('#button-1');
    await click('#button-0');
    await click('#clear-button');

    assert.equal(this.element.querySelector('.display').textContent.trim(), '0', 'Clear button clear the running total and displays 0');
  });

  test('it executes consecutive operations using floating point numbers', async function(assert){
    await render(hbs`<Calculator />`);
    await click('#button-3');
    await click('#decimal-point');
    await click('#button-5');
    await click('#sum-button'); 
    await click('#decimal-point');
    await click('#button-5');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '4', 'Operation 3.5+.5 should display 4');
  });

  test('it gets an error when a division by zero is executed, then screen is cleared when any button is pressed', async function(assert){
    await render(hbs`<Calculator />`);
    await click('#button-8');
    await click('#button-5');
    await click('#division-button');
    await click('#button-0');
    await click('#equal-button');

    assert.equal(this.element.querySelector('.display').textContent.trim(), 'Error: Division by 0', 'Should display an error when a division by zero is executed');
  });

});
