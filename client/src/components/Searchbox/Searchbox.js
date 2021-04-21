import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import './searchbox.css'

const Searchbox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <div>
      <Form onSubmit={submitHandler} className='searchbox' inline>
        <Form.Control
          type="text"
          name="search"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products"
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button type="submit" variant="outline-success" className="p-2">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(Searchbox);
