import React, { JSX, useEffect } from "react";

import "./home.scss";

import bgimage from "./images/homebg1.jpg";
import ssimage from "./images/sundayservice.jpg";


export default function Home(): JSX.Element {
    useEffect(() => {
        const topnav = document.getElementById("nav-main");
        const home = document.getElementById("home");

        if (topnav && home) {
            const navHeight = topnav.offsetHeight;
            home.style.marginTop = `${navHeight}px`;
        }

    }, []);

    return (
    <>
        <section id="home" className="container py-5">
            <div className="home-content">
                <img src={bgimage} alt="Church Home Image" className="home-bg-image"/>
                <div className="home-heading">
                    <h1 className="heading1">Knowing Christ</h1>
                    <h1 className="heading2">And making him known</h1>
                </div>
            </div>
        </section>

        <section id="info" className="container py-5">
            <div className="info-content">
                <div className="info-text">
                    <h2>Sunday Service</h2>
                    <p>
                        Join us every Sunday at 4:30 PM to worship the Lord.
                    </p>
                    <p>
                        We meet at <strong>301 W 31st St, Chicago, IL 60616</strong>.
                    </p>
                </div>
                <div className="info-image">
                    <img src={ssimage} alt="Sunday Service" className="img-fluid" />
                </div>
            </div>
        </section>

        <section id="statement-of-faith" className="container py-5">
            <h2 className="text-center mb-4">Statement of Faith</h2>
            <p className="text-center">
                We believe in the Holy Scriptures as the inspired Word of God and the ultimate and infallible authority in all matters of faith and conduct.
            </p>
        </section>
    </>
);
}