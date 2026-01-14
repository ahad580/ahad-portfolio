
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import ShowcaseProjects from "./components/ShowcaseProjects";
import Projects from "./components/Projects";
import LabsSection from "./components/LabsSection";

export default function Home() {
  return (
    <>
    <div id="top" />
      <Hero />
      <Skills />
      <ShowcaseProjects />
      <Projects />
        <LabsSection /> 
    </>
  );
}

