import React, { JSX } from "react";

import image1 from "./images/homebg1.jpg";
import image2 from "./images/homebg2.jpg";
import image3 from "./images/homebg3.jpg";

export default function Home(): JSX.Element {
    return (
    <>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#info">Info</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    
        <section id="home">
            <img src={image1} alt="Home Image" className="home-image" />
        </section>
    
        <section id="events">
            <h2>Events</h2>
            <div className="event-gallery">
                <img src={image2} alt="Event 1"/>
                <img src={image3} alt="Event 2"/>
                <img src={image1} alt="Event 3"/>
            </div>
        </section>
    
        <section id="info">
            <h2>Meeting Information</h2>
            <p>We meet at <strong>123 Main Street, City, State</strong> every Friday at 6 PM.</p>
        </section>
    
        <footer id="contact">
            <h2>Contact Us</h2>
            <p>Email: contact@ccc.org</p>
            <p>Phone: (123) 456-7890</p>
            <p>&copy; 2025 CCC. All rights reserved.</p>
        </footer>
    </>
);
}