import React, { useState } from "react";
import "../../App.css";

import apiClient from "../../http-common";
import formatResponse from "../../utils/formatResponse";

function PostSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postResult, setPostResult] = useState(null);
  const [isError, setIsError] = useState(false);

  async function postData() {
    setIsError(false);
    const postData = {
      title: title,
      description: description,
    };

    try {
      const res = await apiClient.post("/products", postData, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(result);
    } catch (err) {
      setPostResult(err.message);
      setIsError(true);
    }
  }

  const clearPostOutput = () => {
    setPostResult(null);
  };

  return (
    <div className="card mt-3">
      <div className="card-header">React Axios POST</div>
      <div className="card-body">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            data-testid="title-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            data-testid="description-input"
          />
        </div>
        <button className="btn btn-sm btn-primary" onClick={postData} data-testid="postdata-button">
          Post Data
        </button>
        <button
          className="btn btn-sm btn-warning ml-2"
          onClick={clearPostOutput}
          data-testid="clear-button"
        >
          Clear
        </button>
        <div className="alert alert-primary mt-2" role="alert">
          <span>{`Title: ${title}`}</span>
          <br/>
          <span>{`Description: ${description}`}</span>
        </div>
        {postResult && (
          <>
            <div className="alert alert-secondary mt-2" role="alert">
              <pre data-testid="post-response">{formatResponse(postResult)}</pre>
            </div>
            {!isError && (
              <div className="alert alert-success mt-2" role="alert">
                <span>{`Status: ${postResult?.data?.status}`}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PostSection;
