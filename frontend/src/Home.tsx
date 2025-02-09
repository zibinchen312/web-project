// Import from React Library //
import React, { JSX, useEffect, useState } from "react";
import { sendMessage } from "./api/index"

// Import Styles //
import "./home.scss";

// Import Images //
import bgimage from "./images/homebg1.png";
import ssimage from "./images/sundayservice.png";

// HTML for the Background Image Section //
const HomeImage: React.FC = () => {
    return (
        <section id="home" className="container">
            <div className="home-content">
                <img src={bgimage} alt="Church Meeting" className="home-bg-image img-fluid"/>
                <div className="home-heading">
                    <h1 className="heading1">认识基督</h1>
                    <h1 className="heading2">享受祂的丰富</h1>
                </div>
            </div>
        </section>
    );
}

// HTML for the Info Section //
const InfoSection: React.FC = () => {
    return (
        <section id="info" className="container py-5">
            <div className="info-content row">
                <div className="info-image col-md-6">
                    <img src={ssimage} alt="Sunday Service" className="img-fluid" />
                </div>
                <div className="info-text col-md-6">
                    <h2 className="fw-bolder">主日聚会</h2>
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
            <h2 className="text-center mb-4 fw-bolder">信仰宣言</h2>
            <p className="description text-start">
                圣经是我们的信仰宣言。我们的盼望是进入圣经向我们启示的一切，使我们明白神对世界、对教会以及对我们个人基督徒生活的旨意。
            </p>
            <p className="description text-start">
                我们确实相信正统基督教信仰的基本要点：神是三一的—父、子、圣灵；神的儿子自永远与父同在，并由童女所生，成为肉身，成为人—耶稣基督。祂过了无罪的生活，为了我们的救赎死在十字架上，并在第三日从死里复活，且如今在神的右边，等候祂再来，在地上建立祂的国度。
            </p>
            <p className="description text-start">
                这些是信仰的基本要点，是所有真正的基督徒必须持守的基本信仰。然而，若我们超越这些要点，制定一套关于我们特定信念的信条，我们可能会无意间、不必要地与其他信徒分隔开来。
            </p>
            <p className="description text-start">
                当我们一同站立在基督里，圣灵将引导我们进入一切的真理（约翰福音16:13）。当我们在基督里成长，我们终将清楚地明白自己当持守的信仰：
            </p>
            <p className="description text-start">
                “直等到我们众人在真道上同归于一，认识神的儿子，得以长大成人，满有基督长成的身量，使我们不再作小孩子，中了人的诡计和欺骗的法术，被一切异教之风摇动，飘来飘去，就随从各样的异端；惟用爱心说诚实话，凡事长进，连于元首基督。” ——以弗所书 4:13-15
            </p>
        </section>
    );
}

// HTML for the Contact Form Section //
type SendMessageResponse = {
    success: boolean;
    message?: string;
    error?: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const API_URL = process.env.NODE_ENV === "production"
            ? "https://web-project-backend-psi.vercel.app"
            : "http://localhost:3001";

        try {
            const response: SendMessageResponse = await sendMessage(formData.name, formData.email, formData.message);
            setStatus(response.message || 'Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('Failed to send message due to an unknown error');
        };
    };

    return (
        <section id="contact-form" className="container py-5">
            <h2 className="text-center mb-4 fw-bolder">联系我们</h2>
            <p className="text-center">如果您有任何问题或需要更多信息，请填写以下表格。</p>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">姓名</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">电子邮件</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">消息</label>
                            <textarea 
                                className="form-control" 
                                id="message" 
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange} 
                                required 
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">发送消息</button>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
};

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
        <HomeImage />

        <InfoSection />

        <FaithStatement />

        <ContactForm />
    </>
    );
}