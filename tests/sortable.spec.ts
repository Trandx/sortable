
import { beforeEach, describe, expect, it } from 'vitest';
import {
  sort,
} from '../src';
import data from './data'
import { assert } from 'node:console';

describe('sort', () => {
  
    let flatArray:number[];
    let flatNaturalArray:string[];
    let students:{
        name:string,
        dob:Date,
        address:{ streetNumber?:number },
    }[];
    let multiPropArray:{
        name:string,
        lastName:string|null,
        age:number,
        unit:string,
    }[];

  beforeEach(() => {
     flatArray = [1, 5, 3, 2, 4, 5];
     flatNaturalArray = ['A10', 'A2', 'B10', 'B2'];

     students = [{
      name: 'Mate',
      dob: new Date(1987, 14, 11),
      address: { streetNumber: 3 },
    }, {
      name: 'Ante',
      dob: new Date(1987, 14, 9),
      address: {},
    }, {
      name: 'Dino',
      dob: new Date(1987, 14, 10),
      address: { streetNumber: 1 },
    }];

     multiPropArray = [{
      name: 'aa',
      lastName: 'aa',
      age: 10,
      unit: 'A10',
    }, {
      name: 'aa',
      lastName: null,
      age: 9,
      unit: 'A01',
    }, {
      name: 'aa',
      lastName: 'bb',
      age: 11,
      unit: 'C2',
    }, {
      name: 'bb',
      lastName: 'aa',
      age: 6,
      unit: 'B3',
    }];
  });

  it('Should sort flat array in ascending order', () => {
    const sorted = sort(flatArray).asc();
    console.log(sorted);
    
    expect(sorted).toStrictEqual( [1, 2, 3, 4, 5, 5]);

    // flatArray should not be modified
    expect(sorted).not.toStrictEqual([1, 5, 3, 2, 4, 5]);
  });
})