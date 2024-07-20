import { Layout } from '@/layout'
import { preinit } from 'react-dom'

export const Route = () => {
  preinit('/about.style', {
    as: 'style',
  })
  return (
    <Layout>
      <p>about</p>
    </Layout>
  )
}
