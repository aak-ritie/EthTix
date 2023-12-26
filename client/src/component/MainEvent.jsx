import React from "react";
import { Link } from "react-router-dom";
import ticketcounter from "../assets/images/tickets.gif";

const MainEvent = () => {
  return (
    <div className="main-event">
      <div className="maine image-container">
        <img src={ticketcounter} className="ticketcounter" />
      </div>
      <div
        className="text-container"
        style={{ justifyContent: "center", paddingLeft: "0px" }}
      >
        <div className="maine text-block">
          <p className="main-text">Smart Ticket Solutions</p>
          <p className="sub-text">
            Traditional ticketing systems are prone to issues like counterfeit
            tickets, fake entries, and high fees. Step into a secure and
            transparent future with our decentralized ticketing platform.
            Embrace the revolution. Secure your tickets now.
          </p>
        </div>
        <div className="maine buttons">
          <Link to="/events" className="main-button">
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainEvent;
