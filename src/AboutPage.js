import React, { useEffect } from "react"
import About from "./About"

const AboutPage = () => {
  useEffect(() => {
    document.title = "Arbor | About"
  }, [])
  return <About />
}

export default AboutPage
