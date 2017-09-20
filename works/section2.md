20,9,2017
#CS50 Section #2


##On Booleans
A quick note, don't do this:

```
if (bool == true)
{
	// Do this
}
```

Instead, do this:

```
if (bool)
{
	// Do this
}
```

Much better.

##On Style
 - Four spaces for indentation
 - Spaces around keywords and operators
 	- Excluding unary operators (<code>!x</code>,<code>x++</code> are valid)
 
## Sorting and Searching!

Linear search => O(n)

Binary search => O(log n)

Bubble sort, insertion sort, selection sort => O(n^2)

Merge Sort => O(n log n)

[For descriptions of above algorithms](https://visualgo.net/en/sorting)

##Pointers and Memory

Memory in a computer consists of a long "array" of possible locations, each denoted by an "address" (eg `0x53`). These addresses are virtually mapped to physical memory (RAM 🐑). Each address corresponds to one byte of memory.

But... things can be multiple bytes. An `int` might take up 4 bytes. Referring to an `int` then refers to four adresses in memory.

Let's say we have some function, like

```
void add_one(int x) {
	x = x+1;
}
```

When we call `add_one(x)`, it won't actually change our original `x` in the memory. It will instead make a copy, and change that.

If we want to find the location in memory of our original `x`, we can do `int *p = &x`. This is a pointer to an address in the memory.

When we dereference a pointer `*p = 3`, this will go to the memory location referenced in `p` and change it to `3`.

So, we could rewrite our function to be:

```
void add_one(int *p) {
	*p++;
}
```

Here, we pass a pointer to a location in memory, which we then dereference (get the value of) and add one to.

### Arrays with Pointers
Consider

```
char arr[4];
arr[0] = 1;
arr[1] = 2;
arr[2] = 3;
arr[3] = 4;
```

We can do:

```
char *p = arr;
*p = 3;
```

Which makes `arr = {3, 2, 3, 4}`.

We can also do:

```
*(p+1) = 5;
```

Which makes `arr = {3, 5, 3, 4}`.

`*(p+i)` is then equivalent to the `arr[i]` syntax.

Just a note, pointer arithmetic is actually done with respect to `sizeof` the type of the array, so `*(p+1)` in an `int arr[n]` will increment the pointer by addresses.

## Dynamic Memory
```
int size = get_int();
char arr[size];
```
This is dynamic memory because we don't actually know the size of the array until the user inputs it.

So, rather than this, we could do:

```
int size = get_int();
char *arr = malloc(sizeof(char) * size);
```
_note that sizeof(char) is always 1_

Which allocates the memory appropriately.

###malloc()
`malloc(size_in_bytes)` allocates the correct number of bytes.

If `malloc()` fails, it returns `NULL`--you can't dereference `NULL`. So we should always check:

```
if (arr == NULL) {
	return 1;
}
```

###free()
C doesn't implement garbage collection or anything like that. If you malloc something, you must also free it. Otherwise, it's a memory leak.

We can do this by calling:

```
free(arr);
```

But only do it once, otherwise C has no idea what to do.

##Strings
`string` in `cs50.h` literally just replaces `string` with `char *` (since a string is an array of chars which is a pointer to the first element).

### A cool way to iterate through a string
Rather than doing:

```
char *s = "Hello World";
for (int i = 0; i < strlen(*s); i++) {
	printf("%c", s[i]);
}
```

We can do:

```
char *s = "Hello World";
while (*s != '\0') {
	printf("%c", *s);
	s++;
}
```