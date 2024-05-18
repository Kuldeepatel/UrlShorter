import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import backgroundImage from '../asstes/backgroundImage.jpg';

const Home = () => {
  const [inputURL, setInputURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleURLChange = (e) => {
    setInputURL(e.target.value);
  };

  const addURL = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/shorter", {
        fullUrl: inputURL,
      });
      console.log("Response from backend:", response.data);
      setShortURL(response.data.shortUrl);
      setError(null);
      setCopySuccess(false); // Reset copy success state
      setInputURL(""); // Clear input field
    } catch (error) {
      console.error("There was an error creating the short URL!", error);
      setError("Error: Could not create short URL.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortURL).then(() => {
      setCopySuccess(true);
    }, () => {
      setCopySuccess(false);
    });
  };

  return (
    <Container>
       <Title>URL Shortener</Title>
      <FormContainer>
        <InputLabel>Enter URL:</InputLabel>
        <InputField
          type="text"
          onChange={handleURLChange}
          value={inputURL}
          placeholder="Enter URL here"
        />
        <SubmitButton onClick={addURL}>Generate Short URL</SubmitButton>
      </FormContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        shortURL && (
          <ShortURL>
            <p>Short URL:</p>
            <a href={shortURL} target="_blank" rel="noopener noreferrer">{shortURL}</a>
            <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
            {copySuccess && <SuccessMessage>Copied!</SuccessMessage>}
          </ShortURL>
        )
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: 450px;
  height: 100vh; 
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover; 
  background-position: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #333;
 
`;

const FormContainer = styled.div`
  width: 600px;
  height:150px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  
`;

const InputLabel = styled.p`
  font-size: 14px;
  font-weight: 600;

`;

const InputField = styled.input`
  width: 100%; /* Set the width to 100% */
  height: 33px;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin-bottom: 10px;
  
  &:hover {
    border: 1px solid orange;
  }
`;

const SubmitButton = styled.button`
  width: 100%; /* Set the width to 100% */
  height: 35px;
  background-color: #f3b414;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e2a900;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const LoadingMessage = styled.p`
  color: #333;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-bottom: 5px;
`;

const ShortURL = styled.div`
  display: flex;
  width:30%;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  justify-content: center;
  margin-top: 20px;

  p {
    margin-right: 10px;
    font-weight: 600;
    align-items: center;
    justify-content: center;
  }

  a {
    color: white;
    align-items: center;
    text-decoration: none;
    margin-right: 10px;
    justify-content: center;
  }
`;

const CopyButton = styled.button`
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  width:20%;
  height:50%;
  justify-content: center;
  align-items: center;
  border: none;
  margin-left:40px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default Home;
