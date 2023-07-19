import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Smart Nutrition</title>
      </Head>
      <div>
        {children}
      </div>
    </>
  )
}
