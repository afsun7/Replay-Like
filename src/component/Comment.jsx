import Replay from "./Replay";
import { LikeFilled } from "@ant-design/icons";
import { DateCalculator } from "../helper/date-method";
import { useState } from "react";
export default function Comment({
  key,
  user,
  text,
  id,
  likes,
  iLikedIt,
  handeLike,
  handelReplay,
  replies,
  date,
  data,
  setData,
  handelLikeReplay,
}) {
  const [idReplay, setIdReplay] = useState(0);
  const [input, setinput] = useState("");
  const commentDate = new Date(date);
  const currentDate = new Date();
  const DaysAgo = DateCalculator(currentDate, commentDate);
  console.log();
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
    <>
      <div className="flex flex-row gap-4 m-4 items-start " key={key}>
        <div className="w-12   rounded-full text-center ">
          {user.avatar ? (
            <img src={`${user.avatar}`} className="rounded-full " />
          ) : (
            <div className="w-12 h-12 bg-sky-100 rounded-full  flex justify-center  items-center ">
              <h1 className=" text-xl text-sky-600   ">
                {user.name.split(" ").map((item) => item.charAt(0))}
              </h1>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start text-start leading-8">
          <div className="text-xl">{user.name}</div>
          <div className="text-sm text-gray-400 inline">{DaysAgo}</div>
          <div>
            {text.split(" ").map((item) => {
              if (item.charAt(0) != "@") {
                return <span className="text-gray-500">{`${item}` + " "}</span>;
              } else if (item.charAt(0) === "@") {
                return <span className="text-sky-600">{`${item}` + " "}</span>;
              }
            })}
          </div>
          <div className="flex gap-4">
            <div
              className={
                iLikedIt
                  ? "bg-sky-400 rounded-2xl flex gap-2 justify-center px-4 items-center"
                  : " bg-gray-200 rounded-2xl flex gap-2 justify-center px-4 items-center"
              }
              onClick={() => handeLike(id, likes, iLikedIt)}
            >
              <LikeFilled
                className={iLikedIt ? "text-white" : " text-gray-400 "}
              />
              <span>{likes}</span>
            </div>
            <span
              className="text-sky-500 hover:cursor-pointer"
              onClick={() => handelReplay(id)}
            >
              Replay
            </span>
          </div>
          {replies.length ? (
            <div className="flex flex-col gap-4 mt-4 items-start">
              <Replay
                replies={replies}
                handelLikeReplay={handelLikeReplay}
                id={id}
                date={date}
              />
            </div>
          ) : null}
          {idReplay === id ? (
            <input
              className="border-solid border-2  w-64 mt-4 "
              onKeyUp={handelInput}
              onMouseOut={() => setIdReplay(0)}
            />
          ) : null}
        </div>
      </div>
      <hr />
    </>
  );
}
