/**
Remove circular references from objects.

@returns A deep copy of the given object or array with circular references removed.

@example
```
import decircular from 'decircular';

const object = {
	a: 1,
	b: {
		c: 2
	}
};

object.b.d = object.b; // Creates a circular reference

console.log(decircular(object));
// {
// 	a: 1,
// 	b: {
// 		c: 2,
// 		d: '[Circular *b]'
// 	}
// }
```
*/
export default function decircular<T extends object>(object: T): T; // eslint-disable-line @typescript-eslint/ban-types
