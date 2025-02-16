// Import from React Library //
import React, { JSX, useEffect, useState } from 'react';
import axios from 'axios';

// Import Styles //
import "./articles.scss";

const Blog: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/messages/send', formData);
      console.log('Blog message response:', response.data);
      alert('Blog message submitted successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting blog message:', error);
      alert('Failed to submit blog message.');
    }
  };

  return (
    <div id="blog" className="container py-5">
        <h1 className="text-center mb-4 fw-bolder">Blog</h1>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
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
                        <label htmlFor="email" className="form-label">Email</label>
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
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default function Blogs(): JSX.Element {

    useEffect(() => {
        const topnav = document.getElementById("nav-main");
        const blog = document.getElementById("blog");

        if (topnav && blog) {
            const navHeight = topnav.offsetHeight;  // Get the height of the navbar
            blog.style.marginTop = `${navHeight}px`;    // Set the margin-top of home to the height of navbar
        }
    }, []);

    return (
        <>
            <Blog/>
        </>
    )
}