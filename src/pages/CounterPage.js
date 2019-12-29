import React from 'react'
import { view as Counter, reducer, stateKey } from '../components/counter'

const END_POINT = process.env.HOST_NAME || 'localhost:9000'

const initState = () => (
  fetch(`http://${END_POINT}/api/count`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Fail to fetch count!')
      }
      return res.json()
    })
    .then((jsonData) => jsonData.count)
    .catch((err) => {
      throw new Error(err)
    })
)

function page() {
  return (
    <div>
      <h1>Counter</h1>
      <Counter/>
    </div>
  )
}

export {
  page,
  reducer,
  stateKey,
  initState
}
