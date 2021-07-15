import React from "react";
import axios from "axios";

function Article({ currentTab }) {
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
    <div>
      <h1> Article </h1>
      <p> {articleType} </p>
      {articles ? (
        articles.map((article) => <div key={article._id}> <p>{JSON.stringify(article)} </p> </div>)
      ) : (
        <p> Loading </p>
      )}
    </div>
  );
}

export default Article;
