import React, { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [data, setData] = useState([])
    const [search, setSearch] = useState("")
  const [isExpanded, setExpanded] = useState(false);
  const [isGifClick, setGifClick] = useState(false)

  const [post, setPost] = useState({
    content: "",
    gif:""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setPost(prevPost => {
      return {
        ...prevPost,
        [name]: value
      };
    });
  }

  function submitPost(event) {
    props.onAdd(post);
    setPost({
      content: "",
      gif:""
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

useEffect(()=>{
    const fetchData = async ()=>{
    const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
            api_key: "2S4ggvCsetEzPnyoPwGX6ZRRC6SNDa1N",
            limit: 4  
        }
    });
    setData(results.data.data)
    };

    fetchData();                  
}, []);

function handleGifClick(e){
        console.log(e.target.src);
        setPost({...post, gif: e.target.src});
}

const renderGifs = ()=>{
    return  data.map(el =>{
        return (
            <div
            onClick={handleGifClick}
             key={el.id} className="gif">
            <img alt="gif" src={el.images.fixed_height.url}/>
            </div>
        )
    })
}

const gifInputChange = async event =>{
        setSearch(event.target.value);
        const results = await axios("https://api.giphy.com/v1/gifs/search",{
            params: {
                api_key: "2S4ggvCsetEzPnyoPwGX6ZRRC6SNDa1N",
                q: search,
                limit: 4
            }
        });
            setData(results.data.data)
}

function handleGifButton(e){
  if (isGifClick === true){
    setGifClick(false)
  } else {
    setGifClick(true)
  }
  e.preventDefault();
} return (
    <div>
      <form className="create-post">
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={post.content}
          placeholder="Create a post..."
          rows={isExpanded ? 3 : 1}
        />
         {isExpanded && (
          <input
            className="gifInput"
            name="gif"
            value={post.gif}
            readOnly
          />
         )}
          <Zoom in={isExpanded}>
          <Fab onClick={handleGifButton} className="gif">Gif</Fab>
          </Zoom>

        <Zoom in={isExpanded}>
          <Fab onClick={submitPost}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
{isGifClick && (
  <div>
  <input 
      onChange={gifInputChange}
      value={search}
      type="text"
      placeholder="search"
      className="form-control"/>
<div className="container gifs">{renderGifs()}</div>
</div>
)}
  </div>
);
}

export default CreateArea;
