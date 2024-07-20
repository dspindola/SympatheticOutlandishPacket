import { Layout } from '@/layout'
import { use } from 'react'
import { preinit } from 'react-dom'

export const Route = () => {
  preinit('/index.style', {
    as: 'style',
  })

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}
