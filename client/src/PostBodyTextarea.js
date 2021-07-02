import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import React from "react";
import PropTypes from 'prop-types';
import './PostBodyTextarea.css';

function PostBodyTextarea(props) {
  return (
    <>
      <textarea className="BodyTextarea" 
        onChange={e => props.handlePostBodyChange(e.target.value)}
        placeholder={props.placeholder} value={props.value}/>
      {!!props.value && props.value.length > 0 && (
        <div className="PreviewArea">
          <ReactMarkdown plugins={[gfm]} children={props.value} />
        </div>
      )}
    </>
  );
}

PostBodyTextarea.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handlePostBodyChange: PropTypes.any,
};

export default PostBodyTextarea;