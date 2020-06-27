import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Calculator />`);
    assert.equal(this.element.textContent.trim().replace(/\s+/g,' '), '0 7 8 9 4 5 6 1 2 3 0 . x ÷ + - +/- = C');
  });

  test('it concatenate numbers and add them in display screen', async function(assert) {
    await render(hbs`<Calculator />`);
    await clickNumber('96');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '96', 'Numbers are added to display screen');
  });

  test('it adds decimal point to display screen only once', async function(assert) {
    await render(hbs`<Calculator />`);
    await clickNumber('20');
    await click('#decimal-point');
    await click('#decimal-point');
    await click('#button-5');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '20.5', 'Decimal point can be added only once');
  });

  test('it sums, subtracts, multiply and divides using the operator buttons', async function(assert){
    await render(hbs`<Calculator />`);
    await clickNumber('90');
    await click('#sum-button');
    await clickNumber('30');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '120', 'Sum of 90 and 30 will display 120');

    await click('#button-3');
    await click('#subtract-button');
    await click('#button-5');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '-2', '3 minus 5 will display -2');

    await clickNumber('25');
    await click('#multiply-button');
    await clickNumber('4');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '100', '25 multiplied by 4 will display 100');

    await clickNumber('50');
    await click('#division-button');
    await clickNumber('10');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '5', '50 divided by 10 will display 5');
  });

  test('it should change the sign when the sign button is pressed', async function(assert){
    await render(hbs`<Calculator />`);
    await clickNumber('600');
    await click('#sign-button');
    await click('#sum-button');
    await clickNumber('400');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(),'-200', 'When the operation -600 + 400 is executed should display -200');
  });

  test('it should delete the last pressed character when the backspace button is pressed', async function(assert){
    await render(hbs`<Calculator />`);
    await clickNumber('200');
    await click('#backspace');

    assert.equal(this.element.querySelector('.display').textContent.trim(),'20', 'When backspace is pressed the right character should be erased');
    await click('#backspace');
    await click('#backspace');
    assert.equal(this.element.querySelector('.display').textContent.trim(),'0', 'When all characters are erased should display 0');

    await clickNumber('410');
    await click('#sign-button');

    for(var i=0;i<3;i++){
      await click('#backspace');
    }

    assert.equal(this.element.querySelector('.display').textContent.trim(),'0', 'When all characters are erased should display 0');
  });

  test('it shows the result of consecutive operations when equal button is pressed', async function(assert){
    await render(hbs`<Calculator />`);
    await clickNumber('35');
    await click('#sum-button');
    await clickNumber('10');
    await click('#multiply-button');
    await clickNumber('2');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '90', 'Operation (35+10)*2 should display 90');
  });


  test('it clears the screen when the erase button is pressed', async function(assert){
    await render(hbs`<Calculator />`);
    await clickNumber('90');
    await click('#multiply-button');
    await clickNumber('10');
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

  test('it executes multiple operations and displays the result when an operator button is pressed', async function(assert){
    await render(hbs`<Calculator />`);
    await clickNumber('450.5');
    await click('#sum-button');
    await clickNumber('534.56');
    await click('#multiply-button');
    await clickNumber('418.365');
    await click('#division-button');
    await click('#button-3');
    await click('#sum-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '137371.5423', 'When operation ((450.5+534.56)*418.365)/3 and the sum button is pressed, it should display the result');
  });

  test('it executes multiple operations and limit the result to 10 decimals', async function(assert){
    await render(hbs`<Calculator />`);
    await clickNumber('450.64345659');
    await click('#multiply-button');
    await clickNumber('3.435546943');
    await click('#sum-button');
    await clickNumber('99')
    await click('#division-button');
    await clickNumber('3');
    await click('#subtract-button');
    await clickNumber('50');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '499.0689165569', 'Should display 499.0689165569 as the result when operation (((450.64345659*3.435546943)+99)/3)-50 is executed');
  });


  test('should execute an operation using all operartors', async function(assert){
    await render(hbs`<Calculator />`);
    await clickNumber('5000000');
    await click('#subtract-button');
    await clickNumber('200');
    await click('#multiply-button');
    await clickNumber('25');
    await click('#sign-button');
    await click('#division-button');
    await clickNumber('400');
    await click('#backspace');
    await click('#equal-button');

    assert.equal(this.element.querySelector('.display').textContent.trim(),'-3124875','((5000000-200)*-25)/40');
  });

  test('it gets an error when a division by zero is executed, then screen is cleared when any button is pressed', async function(assert){
    await render(hbs`<Calculator />`);
    await clickNumber('85');
    await click('#division-button');
    await clickNumber('0');
    await click('#equal-button');
    assert.equal(this.element.querySelector('.display').textContent.trim(), 'Error: Division by 0', 'Should display an error when a division by zero is executed');
  });

  async function clickNumber(number){
    for(let index=0; index<number.length; index++){
      if(number.charAt(index) === '.'){
        await click(`#decimal-point`);
      } else {
        await click(`#button-${number.charAt(index)}`);
      }
    }
  }

});
