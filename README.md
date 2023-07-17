# Sortable
## Inspired from Fast-sort
[![Start](https://img.shields.io/github/stars/Trandx/sortable?style=flat-square)](https://github.com/Trandx/sortable)
[![Total Downloads](https://img.shields.io/github/downloads/trandx/sortable/total)](https://www.npmjs.com/package/@trandx/sortable)
[![Known Vulnerabilities](https://snyk.io/test/github/Trandx/sortable/badge.svg)](https://snyk.io/test/github/Trandx/sortable/badge)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

[![NPM Package](https://nodei.co/npm/@trandx/sortable.png)](https://www.npmjs.com/package/@trandx/sortable)

Sortable is a lightweight (311 bytes gzip), zero-dependency sorting library with TypeScript support.
Its easy-to-use and flexible syntax, combined with incredible speed put than Fast-sort library. It's a top choice for developers who seek efficient, reliable, and customizable sorting solutions.

## Quick examples

```javascript
  import { sort } from 'sortable';

  // Sort flat arrays
  const ascSorted = sort([1,4,2]).asc(); // => [1, 2, 4]
  const descSorted = sort([1, 4, 2]).desc(); // => [4, 2, 1]

  // Sort users (array of objects) by firstName in descending order
  const sorted = sort(users).desc(u => u.firstName);

  // Sort users in ascending order by firstName and lastName
  const sorted = sort(users).asc([
    u => u.firstName,
    u => u.lastName
  ]);
  // Sort users in ascending order by firstName and lastName
  const sorted = sort(users).asc([
    "firstName",
    u => u.lastName,
    "author.lastName"
  ]);

  // Sort users ascending by firstName and descending by city
  const sorted = sort(users).by([
    { asc: u => u.created_at },
    { desc: ["city"] }
  ]);

  // Sort based on computed property
  const sorted = sort(repositories).desc(r => (r.openIssues + r.closedIssues));

  // Sort using string for object key
  // Only available for root object properties
  const sorted = sort(users).asc('firstName');
```
## Running online code link 
For running code you can check [here](https://playcode.io/1532489)

Fore more examples check [unit tests](https://github.com/Trandx/sortable/blob/production/test/sortable.spec.ts).



NOTE: This library sort automatically date, string, number and booleen datas. it help you to give more sorting precision if you have same field value. for example if you've same username, the second precision that you give (```created_at```) is for have sorting differentiation.


## More examples

```javascript
  // Sorting values that are not sortable will return same value back
  sort(null).asc(); // => null
  sort(33).desc(); // => 33
  sort('john').by({asc:true}); // => john

  // By default fast-sort sorts null and undefined values to the
  // bottom no matter if sorting is in asc or decs order.
  // If this is not intended behaviour you can check "Should create sort instance that sorts nil value to the top in desc order" test on how to override
  const addresses = [{ city: 'Split' }, { city: undefined }, { city: 'Zagreb'}];
  sort(addresses).asc(); // => Split, Zagreb, undefined
```

#### Running
Install via package manager

``npm i @trandx/sortable``
  or
``pnpm i @trandx/sortable``

To run benchmark on your PC follow steps from below

1) git clone ``https://github.com/Trandx/sortable.git``
2) cd ``into the directory ``
3) pnpm install
4) pnpm start

In case you notice any irregularities in benchmark or you want to add sort library to benchmark score
please open issue [here](https://github.com/Trandx/sortable)
## Author

  [![alt text](https://avatars.githubusercontent.com/u/42522718?v=4)](https://github.com/Trandx/sortable)
