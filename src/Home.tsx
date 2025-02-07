// Import from React Library //
import React, { JSX, useEffect } from "react";

// Import Styles //
import "./home.scss";

// Import Images //
import bgimage from "./images/homebg1.jpg";
import ssimage from "./images/sundayservice.jpg";

// HTML for the Info Section //
const InfoSection: React.FC = () => {
    return (
        <section id="info" className="container py-5">
            <div className="info-content row">
                <div className="info-image col-md-6">
                    <img src={ssimage} alt="Sunday Service" className="img-fluid" />
                </div>
                <div className="info-text col-md-6">
                    <h2>主日聚会</h2>
                    <p>
                        每周日下午四点半，欢迎你来参加我们的主日聚会！
                    </p>
                    <p>
                        聚会地点：<strong>301 W 31st St, Chicago, IL 60616</strong>
                    </p>
                    <div className="info-button">
                        <a href="https://www.google.com/maps/place/301+W+31st+St,+Chicago,+IL+60616" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            查看地图
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

// HTML for the Statement of Faith Section //
const FaithStatement: React.FC = () => {
    return (
        <section id="statement-of-faith" className="container py-5">
            <h2 className="text-center mb-4">信仰宣言</h2>
            <p className="text-center">
                我们相信圣经是上帝所默示的圣言，是信仰和行为的最高权威。
            </p>
        </section>
    );
}

// Home Component //
export default function Home(): JSX.Element {

    // Adjust margin-top of home to account for the fixed navbar
    useEffect(() => {
        const topnav = document.getElementById("nav-main");
        const home = document.getElementById("home");

        if (topnav && home) {
            const navHeight = topnav.offsetHeight;  // Get the height of the navbar
            home.style.marginTop = `${navHeight}px`;    // Set the margin-top of home to the height of navbar
        }

    }, []);

    return (
    <>
        <section id="home" className="container">
            <div className="home-content">
                <img src={bgimage} alt="Church Meeting" className="home-bg-image img-fluid"/>
                <div className="home-heading">
                    <h1 className="heading1">认识基督</h1>
                    <h1 className="heading2">享受祂的丰富</h1>
                </div>
            </div>
        </section>

        <InfoSection />

        <FaithStatement />
    </>
);
}