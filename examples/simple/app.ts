import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e.message)
})