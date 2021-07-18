import React from 'react'
import styled from 'styled-components'
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core'

function Article({article}) {
    return (
        <StyledArticle>
            <Card className="card">
                <CardMedia component="img" alt="article image" height="200" image={article.image} title="article image"/>
                <CardContent>
                    <p className="article-title">{article.title}</p>
                    <p className="article-desc">{article.description}</p>
                    <div className="article-categories">{article.category.map((category) => (<p> #{category} </p> ))} </div>
                </CardContent>
            </Card>
        </StyledArticle>
    )
}

const StyledArticle = styled.div`
    .card {
        max-width: 500px;
        margin: 1rem;
        box-shadow: none;
        border-bottom: 3px solid black;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .article-title {
            font-size: 3rem;
            font-weight: bold;
            border-top: 2px solid black;
            border-bottom: 2px solid black;
            padding: .25rem 0 .25rem 0;

            
        }
        .article-desc {
            font-size: 1rem;

        }
        .article-categories {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-evenly;
        }
    }




`

export default Article
