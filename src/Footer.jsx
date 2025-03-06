import React from "react"
import "./Arbor.css"
import pic from "./img/boctrophies.jpg"

const Footer = () => (
  <div className="arbor-footer">
    <footer className="container">
      <div className="row">
        <div className="col-md-4">
          <img
            className="footer-photo"
            src={pic}
            alt="BOC trophies"
            title="BOC trophies"
          ></img>
        </div>
        <div className="col-md-8">
          <h3>Arbor</h3>
          <p>
            The Maprunner Archive of British Orienteering Records (Arbor)
            includes full results from all major British events dating back to
            around 2000, as well as M21E and W21E champions from the start of
            each event. Select a menu option to try out the various queries
            available and see what you find.
          </p>
          <p>
            Copyright © 2025{" "}
            <a
              href="https://www.maprunner.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maprunner
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  </div>
)

export default Footer
