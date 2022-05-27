import test from 'ava';
import SomeClass from './SomeClass.js';

test('SomeClass', (t) => {
  const someClass = new SomeClass({ someArgument: 'someValue' });
  t.assert(someClass !== 'someIncorrectValue');
});
