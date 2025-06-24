// Import from React Library //
import React, { JSX, useEffect, useState, useRef } from "react";
import { sendMessage, SendMessageResponse, getArticles, Article } from "../api/index";

// Import Styles //
import "./home.scss";

// Import Images //
import bgimage from "../images/homebg1.png";
import ssimage from "../images/sundayservice.png";
import sssimage from "../images/meeting.jpg";

import pfp from "../images/pfp.png";
import IIT from "../images/iit_icon.png";
import IITcontact from "../images/iit_wechat.jpg";
import UIC from "../images/uic1_icon.png";
import UChicago from "../images/uc_icon.png";

// HTML for the Background Image Section //
const EventSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const totalSlides = 1;

    const startInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 10000)
    };

    useEffect(() => {
        if (totalSlides > 0) {
            startInterval();
        }
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        }
    }, [totalSlides]);
    
    const toPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
        startInterval();
    };

    const toNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        startInterval();
    };

    return (
        <section id="slideshow" className="container pb-5">
            <div className="carousel">
                <div className="carousel-inner">
                    <div className={`carousel-item ${currentIndex === 0 ? "active" : ""}`}>
                        <img className="slide-image" src={bgimage} alt="home" style={{ filter: "blur(4px)" }}/>
                        <div id="image-text">
                            <h2 className="text-end"><strong className="text-warning">圣经</strong>是我们独一标准</h2>
                            <p className="text-start">
                                在芝加哥区为主耶稣基督作见证。我们的信仰是以圣经为独一的标准，承认基督是神的儿子，为人赎罪而死，三日复活，相信这是宇宙间最大的事实。我们的托付是以基督为内涵，以地方上的教会为彰显。
                                <br/><br/>
                                为基督身体一的见证，主召集我们来在一起，彼此相爱，交通，扶持，并被建造在使徒和先知的根基上，以基督耶稣为房角石。愿神的爱在这里向人涌动，愿神的旨意成就。
                            </p>
                        </div>
                        
                    </div>
                    
                </div>

                {/* Left and Right Arrow Navigation */}
                <a className="carousel-control-prev" onClick={toPrevious} style={{ cursor: "pointer" }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next" onClick={toNext} style={{ cursor: "pointer" }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>
            </div>
            <div className="carousel-indicators">
                {[...Array(totalSlides)].map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    >
                    </button>
                ))}
            </div>
        </section>
    );
};

// HTML for the Info Section //
const InfoSection: React.FC = () => {
    return (
        <section id="info" className="container pb-5">
            {/*
            <div className="info-header"> 
                <h2 className="text-center mb-4 fw-bolder">主日聚会</h2>
            </div>
            */}
            <div className="info-content row text-center">
            
                <div className="info-image col">
                    <img src={ssimage} alt="Sunday Service" className="img-fluid" />
                </div>
                <div className="info-text col">
                    <h2 className="text-center m-0 fw-bolder">
                        主日聚会
                    </h2>
                    <p>
                        时间：每周日下午4：30 - 6:00 PM
                        <br />
                        内容：背经、诗歌、读经
                        <br />
                        地点：<a href="https://www.google.com/maps/place/2958+S+Union+Ave,+Chicago,+IL+60616" target="_blank" rel="noopener noreferrer">2958 S Union Ave, Chicago, IL 60616</a>
                        <br />
                        电话：<a href="tel:732-310-2214">732-310-2214</a>
                        <br />
                        服侍内容：儿童服侍、饭食
                    </p>
                </div>
            </div>
        </section>
    );
};

// HTML for the Campus Section //
const CampusSection: React.FC = () => {

    interface CampusData {
        campus: string;
        person: string;
        time: string;
        phone: string;
        wechat?: string;
        logo?: string;
    }
    
    const campuses: CampusData[] = [
        {
            campus: "Illinois Institute of Technology",
            person: "陈梓彬",
            time: "每周三4:00 PM - 5:00 PM",
            phone: "312-998-3838",
            wechat: IITcontact,
            logo: IIT,
        },
        {
            campus: "University of Illinois at Chicago",
            person: "张威棣",
            time: "？？？",
            phone: "732-310-2214",
            wechat: "？？？",
            logo: UIC,
        },
        {
            campus: "University of Chicago",
            person: "朱暖凉",
            time: "每周五4:00 PM - 5:00 PM",
            phone: "123-456-7890",
            wechat: "？？？",
            logo: UChicago,
        },
    ];

    const [selectedCampusIndex, setSelectedCampusIndex] = useState(0);
    const selectedCampus = campuses[selectedCampusIndex];

    const [selectedWechatModal, setSelectedWechatModal] = useState<string | null>(null);

    // State for the Carousel    
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Total number of slides in the carousel (have to set manually)
    const totalSlides = 3;

    const startInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 10000)
    };

    useEffect(() => {
        if (totalSlides > 0) {
            startInterval();
        }
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        }
    }, [totalSlides]);
    
    const toPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
        startInterval();
    };

    const toNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        startInterval();
    };

    return (
        <section id="campus" className="container pb-5">
            <div className="campus-info row">
                
                {/*
                <div className="campus-left col text-center">
                    <h2>{selectedCampus.name}</h2>
                </div>
                <div className="col"></div>
*/}
                <div className="campus-left col text-center align-items-center justify-content-center">
                    <h2 className="text-center fw-bolder">各个区的聚会</h2>
                    <div className="campus-contacts">
                        <p className="fw-bolder">{selectedCampus.campus}</p>
                        <p>
                            联系人: {selectedCampus.person}
                            <br />
                            时间：{selectedCampus.time}
                            <br />
                            电话: <a href={`tel:${selectedCampus.phone}`}>{selectedCampus.phone}</a>
                            <br />
                            微信: 
                            <button className="btn btn-link p-0" onClick={() => setSelectedWechatModal(selectedCampus.wechat ?? null)}>
                                <i className="bi bi-box-arrow-in-up-right"></i>
                            </button>
                        </p>
                        <div className="campus-indicators d-flex justify-content-center align-items-center gap-4">
                            <button className={`campus-btn btn btn-link p-0 ${selectedCampusIndex === 0 ? "active" : ""}`} onClick={() => setSelectedCampusIndex(0)}>
                                <img src={IIT} alt="UIC Campus" className="campus-icon img-fluid rounded-circle"/>
                            </button>
                            <button className={`campus-btn btn btn-link p-0 ${selectedCampusIndex === 1 ? "active" : ""}`} onClick={() => setSelectedCampusIndex(1)}>
                                <img src={UIC} alt="UIC Campus" className="campus-icon img-fluid rounded-circle"/>
                            </button>
                            <button className={`campus-btn btn btn-link p-0 ${selectedCampusIndex === 2 ? "active" : ""}`} onClick={() => setSelectedCampusIndex(2)}>
                                <img src={UChicago} alt="UIC Campus" className="campus-icon img-fluid rounded-circle"/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="campus-right col text-center my-auto">
                    <div className="campus-carousel carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className={`carousel-item ${currentIndex === 0 ? "active" : ""}`}>
                                <img src={sssimage} alt="IIT Campus" className="img-fluid" />
                            </div>
                            <div className={`carousel-item ${currentIndex === 1 ? "active" : ""}`}>
                                <img src={ssimage} alt="UIC Campus" className="img-fluid" />
                            </div>
                            <div className={`carousel-item ${currentIndex === 2 ? "active" : ""}`}>
                                <img src={bgimage} alt="UChicago Campus" className="img-fluid" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" onClick={toPrevious}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button className="carousel-control-next" onClick={toNext}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                
            </div>

            {selectedWechatModal && (
                <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">微信二维码</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedWechatModal(null)}></button>
                            </div>
                            <div className="modal-body">
                                <img src={selectedWechatModal} alt="Wechat QR Code" className="img-fluid" style={{ zoom: "150%" }}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

// HTML for the Contact Form Section //
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

    useEffect(() => {
        const interval = setInterval(() => {
            const topnav = document.getElementById("nav-title");
            const home = document.getElementById("slideshow");

            if (topnav && home) {
                const navHeight = topnav.offsetHeight;  // Get the height of the navbar
                home.style.marginTop = `${navHeight + 20}px`;    // Set the margin-top of home to the height of navbar
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
    <>
        <EventSlider />

        <InfoSection />

        <CampusSection />

        {/* <FaithStatement /> */}

        {/* <ContactForm /> */}
    </>
    );
}