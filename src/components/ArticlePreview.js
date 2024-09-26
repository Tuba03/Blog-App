import React from 'react';
import './pages/Preview.css'; // Adjust the path to your CSS file

const ArticlePreview = ({ article }) => {
    return (
        <div className="article-preview">
            <img src={article.image} alt={article.title} />
            <div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
            </div>
        </div>
    );
};

export default ArticlePreview;
