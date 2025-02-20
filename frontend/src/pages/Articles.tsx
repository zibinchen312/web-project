import React, { JSX, useState, useEffect } from 'react';
import { Article, getArticles } from '../api'; // Adjust the path as needed
import { Link } from 'react-router-dom';

const ArticlesDisplay: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const fetchedArticles = await getArticles();
                setArticles(fetchedArticles);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch articles.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <p className="text-center mt-3">Loading articles...</p>;
    }

    if (error) {
        return <p className="text-danger text-center mt-3">{error}</p>;
    }

    return (
        <div id="article" className="container py-5">
            <h1 className="my-4 text-center">All Articles</h1>
            <div className="row">
                {articles.map((article) => (
                    <div key={article.id} className="col-12 mb-3 article-box">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5 className="card-title">{article.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{article.author}</h6>
                                        {article.image && (
                                            <img
                                                src={article.image}
                                                alt="Article Image"
                                                className="img-fluid article-image rounded"
                                                onError={() => console.error(`Failed to load image: ${article.image}`)}
                                            />
                                        )}
                                    </div>
                                    <div className="col-md-9 article-text">
                                        <p className="card-text">
                                            {article.content.substring(0, 200)}...
                                        </p>
                                        <Link to={`/article/${article.id}`} className="btn btn-primary">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Articles: React.FC = (): JSX.Element => {

    useEffect(() => {
        const topnav = document.getElementById('nav-main');
        const article = document.getElementById('article');

        if (topnav && article) {
            const navHeight = topnav.offsetHeight;  // Get the height of the navbar
            article.style.marginTop = `${navHeight + 20}px`;    // Set the margin-top of home to the height of navbar
        }
    }, []);

    return (
        <>
            <ArticlesDisplay/>
        </>
    );
};

export default Articles;