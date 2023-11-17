import test from 'ava';
import decircular from './index.js';

test('handles circular references in objects', t => {
	const object = {a: 1};
	object.b = object; // Circular reference

	t.deepEqual(decircular(object), {
		a: 1,
		b: '[Circular *]',
	});
});

test('handles circular references in nested objects', t => {
	const object = {
		a: 1,
		c: {},
	};

	object.c.d = object.c;

	t.deepEqual(decircular(object), {
		a: 1,
		c: {
			d: '[Circular *c]',
		},
	});
});

test('handles circular references in arrays', t => {
	const array = [1, 2, 3];
	array.push(array); // Circular reference

	t.deepEqual(decircular(array), [1, 2, 3, '[Circular *]']);
});

test('handles non-circular references in objects', t => {
	const object = {
		a: {
			b: {
				c: {
					d: 1,
				},
			},
		},
	};
	object.a.b.e = object.a.b.c;

	t.deepEqual(decircular(object), {
		a: {
			b: {
				c: {
					d: 1,
				},
				e: {
					d: 1,
				},
			},
		},
	});
});

test('handles complex structures with multiple circular references', t => {
	const object = {
		a: 1,
		b: {
			c: 2,
		},
		d: [],
	};

	object.b.e = object;
	object.d.push(object.b);

	t.deepEqual(decircular(object), {
		a: 1,
		b: {
			c: 2,
			e: '[Circular *]',
		},
		d: [
			{
				c: 2,
				e: '[Circular *]',
			},
		],
	});
});

test('handles circular references with array indices in the path', t => {
	const object = {
		a: [
			{
				b: 1,
				c: 1,
			},
		],
	};

	object.a[0].d = object.a[0]; // Circular reference to the array element at index 1

	t.deepEqual(decircular(object), {
		a: [
			{
				b: 1,
				c: 1,
				d: '[Circular *a.0]',
			},
		],
	});
});

test('handles deep nested circular references', t => {
	const object = {
		level1: {
			level2: {
				level3: {},
			},
		},
	};

	object.level1.level2.level3 = object.level1; // Circular reference to a higher level

	t.deepEqual(decircular(object), {
		level1: {
			level2: {
				level3: '[Circular *level1]',
			},
		},
	});
});

test('handles circular references in objects within arrays', t => {
	const object = {
		a: [],
		b: [],
	};

	object.a[0] = object.b; // Circular reference to another object in the array
	object.b[0] = object.a; // Circular reference to another object in the array

	t.deepEqual(decircular(object), {
		a: [['[Circular *a]']],
		b: [['[Circular *b]']],
	});
});

test('handles self-referencing arrays', t => {
	const array = [];
	array[0] = array; // Array references itself

	t.deepEqual(decircular(array), ['[Circular *]']);
});

test('handles circular references in mixed arrays and objects', t => {
	const object = {
		a: 1,
		b: [
			2,
			{
				c: 3,
			},
		],
	};

	object.b[1].ref = object; // Circular reference from an object in an array to the root

	t.deepEqual(decircular(object), {
		a: 1,
		b: [
			2,
			{
				c: 3,
				ref: '[Circular *]',
			},
		],
	});
});

test('handles circular references involving arrays and objects', t => {
	const object = {
		a: [
			{
				b: 1,
			},
		],
	};

	object.a.push(object); // Circular reference from array to object

	t.deepEqual(decircular(object), {
		a: [
			{
				b: 1,
			},
			'[Circular *]',
		],
	});
});

test('handles empty objects and arrays', t => {
	const object = {};
	const array = [];
	object.ref = object; // Circular reference in an empty object
	array.push(array); // Circular reference in an empty array

	t.deepEqual(decircular(object), {ref: '[Circular *]'});
	t.deepEqual(decircular(array), ['[Circular *]']);
});

test('handles circular references in large complex objects', t => {
	const complexObject = {
		a: {
			b: {
				c: {
					d: 1,
				},
			},
		},
		e: {
			f: {
				g: 2,
			},
		},
	};

	complexObject.a.b.c.ref = complexObject.e.f;
	complexObject.e.f.ref = complexObject.a.b;

	t.deepEqual(decircular(complexObject), {
		a: {
			b: {
				c: {
					d: 1,
					ref: {
						g: 2,
						ref: '[Circular *a.b]',
					},
				},
			},
		},
		e: {
			f: {
				g: 2,
				ref: {
					c: {
						d: 1,
						ref: '[Circular *e.f]',
					},
				},
			},
		},
	});
});
