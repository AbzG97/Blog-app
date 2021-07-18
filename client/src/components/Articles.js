import React from "react";
import axios from "axios";
import Article from "./Article";
import styled from "styled-components";

function Articles({ currentTab }) {
  const [articleType, setArticleType] = React.useState();
  const [articles, setArticles] = React.useState();

  React.useEffect(() => {
    switch (currentTab) {
      case 0:
        ViewArticles("Latest");
        break;
      case 1:
        ViewArticles("Gaming");
        break;
      case 2:
        ViewArticles("Programming");
        break;
      case 3:
        ViewArticles("Food");
        break;
      case 4:
        ViewArticles("News");
        break;
      default:
        ViewArticles("Latest");
    }
  }, [currentTab]);

  const ViewArticles = async (type) => {
    const res = await axios({
      method: "GET",
      url: `/articles/?type=${type}`,
    });
    console.log(res.data);
    setArticles(res.data);
    setArticleType(type);
  };
  // ViewArticles();

  return (
    <ArticlesStyle>
      {articles ? <div className="articles-grid"> {
        articles.map((article) => <Article key={article._id} article={article} />)
      } </div> : (
        <p> Loading </p>
      )}
    </ArticlesStyle>
  );
}

const ArticlesStyle = styled.div`
  .articles-grid {
    margin-top: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: auto;
  }
`

export default Articles;