import Layout from '@components/layouts/Layout'
import Home2 from '@components/sections/Home'
import About from '@components/sections/AboutNew'
import Skills from '@components/sections/Skills'
import Qualification from '@components/sections/Qualification'
import Services from '@components/sections/Services'
import Contact from '@components/sections/Contactme'
import ProjectsShowcase from '@components/sections/ProjectsShowcase'

export default function Home() {
  return (
    <Layout>
      <Home2 />
      <About />
      <Skills />
      <Qualification />
      <Services />
      <ProjectsShowcase />
      <Contact />
    </Layout>
  )
}
