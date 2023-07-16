import data from 'example/data'
import {sort} from '@/index'

/// with the method  "asc"

let res = sort<typeof data[0]>(data).asc([
    u => u.title,
   "author.lastName",
  ])

  console.log(data, res)

  /// with the method  "desc"

 res = sort<typeof data[0]>(data).desc([
    u => u.title,
   "author.lastName",
  ])

  console.log(data, res)

/// with the method  "by"
  res = sort<typeof data[0]>(data).by({ 
    asc:[
        u => u.title,
    "author.lastName",
    ],
    desc: "title"
})

  console.log(data, res)