// import React, { useEffect } from "react";
// import { Row, Col } from "reactstrap";
// import Post from "./Post";

// function NewFeed(){
//     // useEffect(()=>{
//     //     //load post from servers
//     //     loadAllPosts().then((data)=>{
//     //         console.log(data);
//     // }).catch(error=>{
//     //     console.log(error)
//     // })

//     // },[])
//     return(
//         <div className="container-fluid">
            
//             <Row>
//                 <Col md={{size:10, offset: 1}} ></Col>
//                 <p>New Feed will be shown here.</p>
//                 <h2>Work in progress...</h2>
//             </Row>
//             <Post />

//         </div>
//     )
// }

// export default NewFeed;


import React from 'react';
import ArticlePreview from './ArticlePreview';
import mockArticles from './MockArticles';
import './pages/Preview.css'; // Adjust the path to your CSS file

const NewFeed = () => {
    return (
        <section className="new-feed">
            <h2>Latest Articles</h2>
            {mockArticles.length > 0 ? (
                mockArticles.map(article => (
                    <ArticlePreview key={article.id} article={article} />
                ))
            ) : (
                <p>No articles available.</p>
            )}
        </section>
    );
};

export default NewFeed;
