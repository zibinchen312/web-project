import React, { JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Article, getArticles, getArticleById } from '../api/index'; // Adjust the path as needed

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = React.useState<Article | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const fetchedArticle = await getArticleById(id!);
                setArticle(fetchedArticle);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch article.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return <p className="text-center mt-3">Loading article...</p>;
    }

    if (error) {
        return <p className="text-danger text-center mt-3">{error}</p>;
    }

    if (!article) {
        return <p className="text-center mt-3">Article not found</p>;
    }

    return (
        <div id="article-page" className="container py-5">
            <h1 className="my-4 text-center">{article.title}</h1>
            <div className="row">
                <div className="col-md-12">
                    <h6 className="text-muted">{article.author}</h6>
                    {article.image && (
                        <img
                            src={article.image}
                            alt="Article Image"
                            className="img-fluid mb-3"
                        />
                    )}
                    <p>{article.content}</p>
                </div>
            </div>
        </div>
    );
};

const ArticleDetails: React.FC = (): JSX.Element => {

        useEffect(() => {
            const interval = setInterval(() => {
                const topnav = document.getElementById("nav-title");
                const home = document.getElementById("article-page");
    
                if (topnav && home) {
                    const navHeight = topnav.offsetHeight;  // Get the height of the navbar
                    home.style.marginTop = `${navHeight + 20}px`;    // Set the margin-top of home to the height of navbar
                }
            }, 100);
            return () => clearInterval(interval);
        }, []);
    
    return (
        <>
            <ArticlePage/>
        </>
    );
};

export default ArticleDetails;