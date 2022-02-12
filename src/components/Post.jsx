import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Post(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  return (
    <div className="post">
      <p>{props.content}</p>
      <img src={props.gif} alt="img"/>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Post;
