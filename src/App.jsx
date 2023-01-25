import { LikeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";

import "./App.css";
import Comment from "./component/Comment";

function App() {
  const [data, setData] = useState([]);
  const [id, setlike] = useState(0);
  const [idReplay, setIdReplay] = useState(0);
  const [input, setinput] = useState("");

  const fetchData = async () => {
    const response = await import("../Api/Api.json").then((res) => res.default);
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handeLike = (id, likes, iLikedIt) => {
    data.find((item) => {
      if (item.id === id && !item.iLikedIt) {
        item.likes = parseInt(`${likes}`) + 1;
        item.iLikedIt = !iLikedIt;
        setlike(id);
      }
    });
  };
  const handelLikeReplay = (id, likes, iLikedIt) => {
    data.map((item) => {
      item.replies.find((item) => {
        if (item.id === id && !item.iLikedIt) {
          item.likes = parseInt(`${likes}`) + 1;
          item.iLikedIt = !iLikedIt;
          setlike(id);
        }
      });
    });
  };
  function handelReplay(id) {
    setIdReplay(id);
  }

  function handelInput(e) {
    setinput(e.target.value);
    const Replay = {
      id: Math.floor(Math.random() * 10000),
      date: 0,
      user: { name: "Afsaneh Omidi" },
      text: input,
      likes: 0,
      iLikedIt: false,
    };
    if (e.key === "Enter") {
      if (input !== "") {
        data.find((item) => {
          if (item.id === idReplay) {
            item.replies = [...item.replies, Replay];
          }
        });
      }
    }
    setData([...data]);
  }
  return (
    <div>
      {data.map((item) => (
        <>
          <Comment
            key={item.id}
            user={item.user}
            text={item.text}
            id={item.id}
            likes={item.likes}
            iLikedIt={item.iLikedIt}
            data={data}
            setData={setData}
            handeLike={handeLike}
            handelReplay={handelReplay}
            replies={item.replies}
            date={item.date}
            handelLikeReplay={handelLikeReplay}
          />
        </>
      ))}
    </div>
  );
}

export default App;
