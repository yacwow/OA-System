import React from 'react'

export default function index({match}) {

  return (
    <div>user{match.params.id}</div>
  )
}
