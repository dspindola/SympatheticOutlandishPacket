import { Layout } from '@/layout'
import { preinit } from 'react-dom'

export const Route = () => {
  preinit('/hello/style', {
    as: 'style',
  })
  return (
    <Layout>
      <p>hello</p>
    </Layout>
  )
}
