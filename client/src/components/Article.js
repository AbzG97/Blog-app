import React from "react";

function Article({ currentTab }) {
  const [articleType, setArticleType] = React.useState();

  React.useEffect(() => {
    switch (currentTab) {
      case 0:
        setArticleType("Latest");
        break;
      case 1:
        setArticleType("Gaming");
        break;
      case 2:
        setArticleType("Programming");
        break;
      case 3:
        setArticleType("Food");
        break;
      case 4:
        setArticleType("News");
        break;
      default:
        setArticleType("Latest");
    }
  }, [currentTab]);

  return (
    <div>
      <h1> Article </h1> 
      <p> {articleType} </p>
    </div>
  );
}

export default Article;
