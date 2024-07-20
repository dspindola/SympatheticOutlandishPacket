import { Layout } from '@/layout'
import { use } from 'react'
import { preinit } from 'react-dom'

async function loader() {
  const data = await Bun.$`nu -c "ls | to json"`.text()
  return { data }
}

export const Route = () => {
  const { data } = use(loader())
  preinit('/index.style', {
    as: 'style',
  })

  return (
    <Layout>
      <pre dangerouslySetInnerHTML={{ __html: data }} />
    </Layout>
  )
}
