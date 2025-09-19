import Layout from "@components/layouts/Layout";
import Skills from "@components/sections/Skills";
import Qualification from "@components/sections/Qualification";
import Services from "@components/sections/Services";
import Contact from "@components/sections/Contactme";
import ProjectsShowcase from "@components/sections/ProjectsShowcase";
import HeroSection from "@components/sections/Hero";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SpeedInsights />
      <Layout>
        {/* <Home2 />
        <About /> */}
        <div id="skills">
          <Skills />
        </div>
        <div id="qualification">
          <Qualification />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="projects">
          <ProjectsShowcase />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </Layout>
    </>
  );
}
