

function flatten(inputArray){
    const output = new Set(new Map())
   if(inputArray.length <= 0){
    return []
   }

   function flat(item){
      if(!Array.isArray(item)){
          output.add(item)
    }else{
    item.map((it)=>{
        flat(it)
    })

    }
   }
 inputArray.forEach((item)=>{
flat(item)
   })

   return output
}

// Single-level arrays are unaffected.
// const result = flatten([1, 2,[ 3]]);


// // Flattens recursively.
const result = flatten([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]
console.log(result);





function mostCommonElements(numbers, k) {

  const output = {};

    numbers.map((num) => {
        output[num] = (output[num] || 0) + 1
    })


    
    const res = Object.keys(output).map((item) => parseInt(item)).sort((a,b) => output[b] - output[a]).slice(0, k)


    return res
}

console.log(mostCommonElements([4, 4, 4, 6, 6, 5, 5, 5], 2));
console.log(mostCommonElements([7, 7, 7, 8, 8, 9, 9, 9], 3));
console.log(mostCommonElements([10, 10, 10, 10, 10], 1));
console.log(mostCommonElements( [5,5,2,4,1,5], 1));


// output is
//  [ 4, 5 ]
// [ 7, 8, 9 ]
// [ 10 ]   