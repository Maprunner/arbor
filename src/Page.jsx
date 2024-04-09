import React from "react"
import { Route, Routes } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import Footer from "./Footer"
import EventsTable from "./EventsTable"
import ChampionTable from "./ChampionTable"
import Person from "./Person"
import FightLayout from "./FightLayout"
import AboutPage from "./AboutPage"
import SingleEventTable from "./SingleEventTable"
import "./Arbor.css"

const Page = () => (
  <div>
    <NavigationBar />
    <div className="container">
      <Routes>
        <Route path="/" element={<EventsTable />} />
        <Route path="/person/:name?" element={<Person />} />
        <Route path="/person" element={<Person />} />
        <Route path="/fight/:name1?/:name2?" element={<FightLayout />} />
        <Route path="/fight" element={<FightLayout />} />
        <Route path="/event/:id" element={<SingleEventTable />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/champions" element={<ChampionTable />} />
        <Route element={<EventsTable />} />
      </Routes>
    </div>
    <Footer />
  </div>
)
export default Page
