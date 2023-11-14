# decircular

> Remove circular references from objects

Circular references occur in JavaScript when an object references itself or creates a loop of references involving other objects. This can lead to issues like infinite loops and errors during serialization (e.g., with `JSON.stringify`). This package replaces circular references in objects or arrays with clear path notations (e.g., `[Circular *a.1.b]`). Ideal for data serialization, debugging, and logging.

## Install

```sh
npm install decircular
```

## Usage

```js
import decircular from 'decircular';

const object = {
	a: 1,
	b: {
		c: 2
	}
};

object.b.d = object.b; // Creates a circular reference

console.log(decircular(object));
/*
{
	a: 1,
	b: {
		c: 2,
		d: '[Circular *b]'
	}
}
*/
```

## API

### decircular(object)

Returns a deep copy of the given object or array with circular references removed.

## Related

- [safe-stringify](https://github.com/sindresorhus/safe-stringify) - Serialize objects to JSON with handling for circular references
