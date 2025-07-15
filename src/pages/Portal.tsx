import React, { JSX, useState, useEffect, ChangeEvent } from "react";
// import { Article, getArticles, deleteArticle, createArticle, updateArticle, uploadImage, getUserId } from '../api/index';
import "./portal.scss";

const Articles: React.FC = () => {
  const [userUuid, setUserUuid] = useState<string | undefined>(undefined);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleForm, setArticleForm] = useState({
    title: "",
    author: "",
    content: "",
    imageFile: null as File | null,
  });
  const [editArticleId, setEditArticleId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (err) {
        setError("Failed to fetch articles.");
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticleForm({ ...articleForm, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArticleForm({ ...articleForm, imageFile: e.target.files[0] });
    }
  };

  const handleCreateArticle = async () => {
    if (
      !articleForm.title ||
      !articleForm.author ||
      !articleForm.content ||
      !articleForm.imageFile
    ) {
      alert("Title, author, content, and image are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Uploading image..."); // Log image upload start
      const uploadedImageUrl = await uploadImage(articleForm.imageFile);

      if (!uploadedImageUrl) {
        console.log("Image upload failed."); // Log image upload failure
        throw new Error("Failed to upload image.");
      }

      console.log("Image uploaded successfully. URL:", uploadedImageUrl); // Log successful image upload

      console.log("Creating new article..."); // Log article creation start

      const username = localStorage.getItem("user");

      if (!username) {
        alert("User not logged in!");
        return;
      }

      if (!userUuid) {
        const fetchedUuid = await getUserId(username);
        if (fetchedUuid) {
          setUserUuid(fetchedUuid);
        } else {
          alert("User uuid not found!");
          return;
        }
      }

      const newArticle = await createArticle(
        articleForm.title,
        articleForm.author,
        articleForm.content,
        userUuid!,
        uploadedImageUrl
      );

      console.log("Article created successfully:", newArticle); // Log successful article creation

      setArticles([...articles, newArticle]);
      resetForm();
    } catch (err: any) {
      console.error("Error creating article:", err); // Log the error
      setError("Failed to create article.");
    } finally {
      setLoading(false);
      console.log("handleCreateArticle completed."); // Log function completion
    }
  };

  const handleUpdateArticle = async () => {
    if (
      editArticleId === null ||
      !articleForm.title ||
      !articleForm.author ||
      !articleForm.content
    ) {
      alert("Title, author, and content are required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let imageUrl: string | undefined;
      if (articleForm.imageFile) {
        const uploadedImageUrl = await uploadImage(articleForm.imageFile);
        if (!uploadedImageUrl) {
          throw new Error("Failed to upload image.");
        }
        imageUrl = uploadedImageUrl;
      }

      const updatedArticle = await updateArticle(
        editArticleId,
        articleForm.title,
        articleForm.author,
        articleForm.content,
        imageUrl
      );
      setArticles(
        articles.map((article) =>
          article.id === editArticleId ? updatedArticle : article
        )
      );
      resetForm();
      setEditArticleId(null);
    } catch (err) {
      setError("Failed to update article.");
      console.error("Error updating article:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      //   await deleteArticle(id);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (err) {
      setError("Failed to delete article.");
      console.error("Error deleting article:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditArticle = (article: Article) => {
    setEditArticleId(article.id);
    setArticleForm({
      title: article.title,
      author: article.author,
      content: article.content,
      imageFile: null,
    });
  };

  const resetForm = () => {
    setArticleForm({
      title: "",
      author: "",
      content: "",
      imageFile: null,
    });
  };

  return (
    <div id='portal' className='container py-5'>
      <h1 className='my-4'>User Portal</h1>
      <h2 className='my-4'>Your Articles</h2>

      {loading && <p>Loading...</p>}
      {error && <p className='text-danger'>{error}</p>}

      <div className='create-article-form mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Article Title'
          name='title'
          value={articleForm.title}
          onChange={handleInputChange}
        />
        <input
          type='text'
          className='form-control'
          placeholder='Author'
          name='author'
          value={articleForm.author}
          onChange={handleInputChange}
        />
        <textarea
          className='form-control'
          placeholder='Article Content'
          name='content'
          value={articleForm.content}
          onChange={handleInputChange}
          rows={4}
        />

        <input
          type='file'
          className='form-control'
          onChange={handleImageChange}
        />

        {editArticleId ? (
          <button className='btn btn-primary' onClick={handleUpdateArticle}>
            Update Article
          </button>
        ) : (
          <button className='btn btn-success' onClick={handleCreateArticle}>
            Create New Article
          </button>
        )}
      </div>

      <div className='row'>
        {articles.map((article) => {
          if (!article) {
            return null; // Skip rendering null/undefined articles
          }

          return (
            <div key={article.id} className='col-md-4 mb-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{article.title}</h5>
                  <p className='card-text'>{article.content}</p>
                  {article.image && (
                    <img
                      src={article.image}
                      alt='Article Image'
                      className='img-fluid'
                    />
                  )}
                  <button
                    className='btn btn-primary mr-2'
                    onClick={() => handleEditArticle(article)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Portal(): JSX.Element {
  useEffect(() => {
    const interval = setInterval(() => {
      const topnav = document.getElementById("nav-title");
      const home = document.getElementById("portal");

      if (topnav && home) {
        const navHeight = topnav.offsetHeight; // Get the height of the navbar
        home.style.marginTop = `${navHeight + 20}px`; // Set the margin-top of home to the height of navbar
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <Articles />;
}
