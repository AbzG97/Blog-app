import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
  Button,
  Snackbar
 
} from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";

const CreateArticleForm = () => {

  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [image, setImage] = React.useState();
  const [category, setCategory] = React.useState();
  const [articleCreated, setArticleCreated] = React.useState({isCreated: false, message: String});
  const history = useHistory();


  const handleCategoryChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.checked });
  };



  const PostArticle = async (e) => {
    const category_arr = Object.entries(category);
    const filtered = [];
    console.log(category_arr);
    category_arr.forEach((state) => {
      if (state[1] === true) {
        filtered.push(state[0]);
      }
    });
    e.preventDefault();
    const new_article = await axios.post(
      "/articles",
      {
        title,
        description,
        image,
        filtered,
      },
      { withCredentials: true }
    );
    if (new_article.status === 201) {
        setArticleCreated({isCreated: true, message: new_article.data.message});
        history.push("/");
    }

    console.log(new_article);
  };

  return (
    <StyledCreateArticleForm>

    
      <h1>Create an Article</h1>
      <form onSubmit={PostArticle}>
        <TextField
          className="text-field"
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className="text-field"
          label="Image"
          onChange={(e) => setImage(e.target.value)}
        />
        <TextField
          className="text-field"
          label="Description"
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormLabel component="legend">Choose category</FormLabel>
        <FormControl component="fieldset">
          <FormGroup className="categories-list">
            <FormControlLabel
              control={
                <Checkbox onChange={handleCategoryChange} name="Programming" />
              }
              label="Programming"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleCategoryChange} name="Gaming" />
              }
              label="Gaming"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleCategoryChange} name="News" />}
              label="News"
            />

            <FormControlLabel
              control={<Checkbox onChange={handleCategoryChange} name="Food" />}
              label="Food"
            />
          </FormGroup>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Post
        </Button>
      </form>

      <Link to="/">Home</Link>
      <Snackbar open={articleCreated.isCreated} 
        autoHideDuration={1000}
        // anchorOrigin={ "bottom", "center" }
        message={articleCreated.message} />
    </StyledCreateArticleForm>
  );
}

const StyledCreateArticleForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    .text-field {
      width: inherit;
    }
    .categories-list {
      display: grid;
      width: 35vw;
      grid-template-columns: 50% 50%;
      grid-template-rows: auto;
    }
  }
`

export default CreateArticleForm;
