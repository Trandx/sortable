
// >>> Types and interfaces <<<
type SortByType<T> =
  | string
  | ISortByFunction<T>
  | (string | ISortByFunction<T>)[];

  interface ISortByFunction<T> {
    (prop: T): any;
  }

  type SortByObjectType<T> =
  | SortByAscSorterType<T>
  | SortByDescSorterType<T>
  //| (SortByAscSorterType<T> | SortByDescSorterType<T>)[];

  type SortByAscSorterType<T> = {
    asc: SortByType<T>;
  };
  
  type SortByDescSorterType<T> = {
    desc: SortByType<T>;
  };

  type OrderType = 1 | -1;

  interface ISortParam<T> {
    order?: OrderType;
    //ctx?: T | T[];
    sortBy?: SortByType<T> | SortByObjectType<T>;
  }

  interface IComparer {
    order?: OrderType;
    prevVal?: any;
    nextVal?: any;
  }
  interface IDeepSort<T> extends IComparer  {
    ctx?: T | T[];
    sortBy: (string | ISortByFunction<T>)[];
  }
  interface ISimpleSort<T> extends Omit< IDeepSort<T>, "sortBy"> {
    sortBy?: (string | ISortByFunction<T>);
  }

// >>> Logics <<<
const typeOf = (first: any, second: any) => {
  const _typeofFirst = Array.isArray(first) ? "array" : typeof first;
  const _typrofSecond = Array.isArray(second) ? "array" : typeof second;

  return {
    isSame: _typeofFirst === _typrofSecond,
    firstParam: _typeofFirst,
    secondParam: _typrofSecond,
  };
};

const comparer = ({ nextVal, prevVal, order = 1 }: IComparer) => {
  if (prevVal == null) return order;
  if (nextVal == null) return -order;
  const _typeof = typeOf(prevVal, nextVal);
  
  if (!_typeof.isSame) {
    return (_typeof.firstParam.toString().toLowerCase().localeCompare(_typeof.secondParam.toString().toLowerCase()))*order;
  }else{
    if(_typeof.firstParam === "number"){
      return (prevVal - nextVal ) * order;
    }
   
    if(_typeof.firstParam == "string"){
      const _prevValToDate = Date.parse(prevVal) 
      const _nextValToDate = Date.parse(nextVal)

      if( !isNaN(_prevValToDate) && !isNaN(_nextValToDate)){
        return (_prevValToDate - _nextValToDate)*order
        //return (_prevValToDate.localeCompare(_nextValToDate))*order
      }
    }
    return prevVal.toLowerCase().localeCompare(nextVal.toLowerCase()) * order;
  }
  
};

const getDataByStingDeclaration = function <T>(
  path: string,
  objectOrArrayData: T | T[]
) {
  const pathList = path.split(".");

  return pathList.reduce((item: any, pathVal) => {
    if (typeof item !== "string" && pathVal in item) {
      return item[pathVal];
    }
    throw Error(`property "${pathVal}" doesn't exist in sort data`);
  }, objectOrArrayData);
};

const deepSort = function <T>({ nextVal, prevVal, order, sortBy }: IDeepSort<T>) {
  let comparerState: number| undefined = 0;
  if (sortBy.length < 2) {
    
    const [_sortBy] = sortBy;
    comparerState = simpleSort({ nextVal, prevVal, order, sortBy:_sortBy });
  }

  sortBy = [...new Set(sortBy)]; // to remove duplicated values

  sortBy.every((_sortBy) => {
    console.log({ nextVal, prevVal, order, sortBy:_sortBy });

    comparerState = simpleSort({ nextVal, prevVal, order, sortBy:_sortBy }) ;

    console.log("after: "+comparerState);
    if (comparerState !== 0)return false;
    return true
  });

  return comparerState;
};

const simpleSort = function<T>({ nextVal, prevVal, order, sortBy }: ISimpleSort<T>){

  if (sortBy === undefined) {
    
    return comparer({ nextVal, prevVal, order });

  }

  // Sort list of objects by single object key
  if (typeof sortBy === "string") {
    //if (sortBy.includes(".")) {
      return comparer({
        prevVal: getDataByStingDeclaration(sortBy, prevVal),
        nextVal: getDataByStingDeclaration(sortBy, nextVal),
        order,
      });
    //}
  }
  
  // Sort list of objects by single function sorter
  if (typeof sortBy === "function") {
      return comparer({
        prevVal: sortBy(prevVal),
        nextVal: sortBy(nextVal),
        order,
      });
  }

  throw Error(`sortBy will in boolean | array | string | function type`);

}

const sortWithoutObject = function <T = object>({
  order = 1,
  sortBy,
}: ISortParam<T>) {
  //sortBy is optionnal
  return function (prevVal: any, nextVal: any) {
    // Sort by multiple properties
     if(typeof sortBy == "object" && !(sortBy instanceof Array)){

      let comparerState = 0

      Object.entries(sortBy).every((entry:[String, SortByType<T>]) => {
        
        const [key, _sortBy] = entry;
        const order = key === "asc"?1:key === "desc"?-1: null;

        if(order == null) throw Error("Key of function 'by' muwt be 'asc|desc'")
        console.log(typeof _sortBy, (_sortBy instanceof Object));
        if(Array.isArray(_sortBy)){
          comparerState = deepSort({ nextVal, prevVal, order, sortBy: _sortBy });

          if (comparerState !== 0) return false;

        }else if(typeof sortBy == "object" && !(sortBy instanceof Array)){
          comparerState = simpleSort({ nextVal, prevVal, order, sortBy:_sortBy });
          console.log({ nextVal, prevVal, order, sortBy,comparerState });
          if (comparerState !== 0) return false;
        }

        return true;
        //console.log(key, sortBy[key]);
      });
      return comparerState
    }else if (Array.isArray(sortBy)) {
      return deepSort({ nextVal, prevVal, order, sortBy });
    }else{
      return simpleSort({ nextVal, prevVal, order, sortBy })
    }

  }
};

const runSort = function <T>({ order, sortBy }: ISortParam<T>) {
   
    return globalData.toSorted(
      sortWithoutObject({
        order,
        sortBy,
      })
    );
  
};

// >>> Public <<<

interface ISort<T> {
    /**
     * Sort array in ascending order.
     * @example
     * sort([3, 1, 4]).asc();
     * sort(users).asc(u => u.firstName);
     * sort(users).asc([
     *   u => u.firstName,
     *   u => u.lastName,
     * ]);
     */
    asc(sortBy?: SortByType<T>): T[];
    /**
     * Sort array in descending order.
     * @example
     * sort([3, 1, 4]).desc();
     * sort(users).desc(u => u.firstName);
     * sort(users).desc("author.lastName");
     * sort(users).desc([
     *   u => u.firstName,
     *   u => u.lastName,
     * ]);
     */
    desc(sortBy?: SortByType<T>): T[];
    /**
     * Sort array in ascending or descending order. It allows sorting on multiple props
     * in different order for each of them.
     * @example
     * sort(users).by([
     *  { asc: u => u.score },
     *  { desc: u => u.age },
     *  { desc: u => u.age, asc: u => u.score },
     *  { desc: [u => u.age, u => u.score] },
     * ]);
     */
    by(sortBy: SortByObjectType<T>): T[];
  }
  let globalData: any = null;
  
  export const sort = function <T>(data: T | T[]): ISort<T> {
    globalData = data;
  
    return {
      asc(sortBy?: SortByType<T>): T[] {
        return runSort({ order: 1, sortBy });
      },
      desc(sortBy?: SortByType<T>): T[] {
        return runSort({ order: -1, sortBy });
      },
      by(sortBy: SortByObjectType<T>): T[] {
        return runSort({ sortBy });
      },
    };
  };