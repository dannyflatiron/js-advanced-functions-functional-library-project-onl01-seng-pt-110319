const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callBack) {
      // console.log("collection", collection.values)
      // console.log("callBack", callBack)
      // let newArray = collection      
      // if (Array.isArray(collection) === false) {
      //   newArray = Object.values(collection)
      // if this condition is not met then newArray is set to collection on line 10
      //   // console.log("object", collection)
      //   // console.log("objectValues", Object.values(collection))
      // }

      const newArray = (Array.isArray(collection)) ? collection : Object.values(collection)

      for (let i = 0; i < newArray.length; i++) {
        callBack(newArray[i])
      }
      return collection
    },

    map: function(collection, callBack) {
      // console.log("collection", collection.values)
      // console.log("callBack", callBack)
      let newArray = []
      if (Array.isArray(collection) === false) {
        collection = Object.values(collection)
        // we are storing it in collection because we have to iterate over the collection 
        // must iterate even if its an object or an array but must simultaneously account
        // for both
        // console.log("objectValues", Object.values(collection))
      }
      
      let array = collection
      for (let i = 0; i < collection.length; i++) {
        newArray.push(callBack(array[i]))
      }
      return newArray
    },

    reduce: function(collection, callback, acc) {
      // build args that go into reduce 
      
      // initialValue
      let c = collection.slice(0)

      // accumulator and reference to collection
      if (!acc) {
        acc = collection[0]
        // slice(1) because you shouldn't add the initial value to itself
        c = collection.slice(1)
      }

      for (let i = 0; i < c.length; i++) {
				acc = callback(acc, c[i], c)
      }
      return acc
    },

    find: function(collection, predicate) {
      if (Array.isArray(collection) === false) {
        collection = Object.values(collection)
      }
      // predicate is a truth test function
      // console.log("predicate", predicate)

      for (let i = 0; i < collection.length; i++) {
         if (predicate(collection[i])) {
           return collection[i]
         }
      }
      return undefined
    },

    filter: function(collection, predicate) {
      let newArray = []
      if (Array.isArray(collection) === false) {
        collection = Object.values(collection)
      }
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          newArray.push(collection[i])
        } 
     }
     return newArray
    },

    size: function(collection) {
      if (Array.isArray(collection) === false) {
        collection = Object.values(collection)
        return collection.length
      }
      return collection.length
    },
    
    first: function(collection, n) {
      if (Array.isArray(collection) === false && n) {
        collection = Object.values(collection)
        return collection.slice(0, n) 
      } else if (Array.isArray(collection) === true && n) {
        return collection.slice(0, n) 
      } else {
        return collection[0]
      }
    },

    last: function(collection, n) {
      // console.log("n", n)
      // console.log("collection", collection)
      // console.log("answer", collection[-1])
      if (Array.isArray(collection) === false && n) {
        collection = Object.values(collection)
        return collection.slice(-(n)) 
      } else if (Array.isArray(collection) === true && n) {
        return collection.slice(-(n)) 
      } else {
        return collection[collection.length-1]

      }

    },

    compact: function(array) {
      return array.filter(Boolean)
    },

    sortBy: function(array, callback) {
      // console.log("wtf", [...array])
      // console.log("array", array)
      // spread operator ex:
      // const parts = ['shoulders', 'knees']; 
      // const lyrics = ['head', ...parts, 'and', 'toes']; 
      // //  ["head", "shoulders", "knees", "and", "toes"]
      const newArray = [...array]

      return newArray.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr= []) {
      
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },  }
})()

fi.libraryMethod()
