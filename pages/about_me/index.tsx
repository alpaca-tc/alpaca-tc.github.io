import Head from 'next/head'
import Image from '../../components/Image'
import { FunctionComponent } from 'react'
import Layout from '../../components/Layout'

const AboutMe: FunctionComponent = () => {
  return (
    <Layout title="About Me">
      <Head>
        <title>About Me</title>
      </Head>
      <section className="mb-4">
        <h1 className="block text-black no-underline font-bold text-xl lg:text-3xl font-extrabold leading-none lg:leading-tight">
          自己紹介
        </h1>
        <figure>
          <Image
            src="/images/profile.jpg"
            alt=""
            className="h-10 w-10 md:h-12 md:w-12 lg:h-20 lg:w-20"
            width="240"
            height="240"
          />
          <figcaption>アルパカ隊長・いっくん</figcaption>
        </figure>
      </section>

      <section className="mb-4">
        <h2 className="block text-black no-underline font-bold text-xl lg:text-2xl font-extrabold leading-none lg:leading-tight">
          About
        </h2>
        <ul>
          <li>
            好きなもの、アルパカ、岡本太郎、人、日本酒、Ardbeg、釣り、アート、未知、ゆるいもの、薫した食べ物
          </li>
          <li>苦手なもの、人混み、コンクリート</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="block text-black no-underline font-bold text-xl lg:text-2xl font-extrabold leading-none lg:leading-tight">
          Links
        </h2>
        <ul>
          <li>
            Email:&nbsp;
            <a
              className="font-semibold no-underline hover:text-black"
              href="mailto:alpaca-tc@alpaca.tc"
            >
              alpaca-tc@alpaca.tc
            </a>
          </li>
          <li>
            Twitter:&nbsp;
            <a
              className="font-semibold no-underline hover:text-black"
              href="https://twitter.com/alpaca_tc"
            >
              @alpaca_tc
            </a>
          </li>
          <li>
            GitHub:&nbsp;
            <a
              className="font-semibold no-underline hover:text-black"
              href="https://github.com/alpaca-tc"
            >
              @alpaca-tc
            </a>
          </li>
        </ul>
      </section>
    </Layout>
  )
}

export default AboutMe
