import React from "react";
import { LikeFilled } from "@ant-design/icons";
import { DateCalculator } from "../helper/date-method";
export default function Replay({ replies, id, date, handelLikeReplay }) {
  const commentDate = new Date(date);
  const currentDate = new Date();
  const DaysAgo = DateCalculator(currentDate, commentDate);

  return replies.map((item) => (
    <>
      <div className="flex flex-row gap-4 m-4 items-start ">
        <div className="w-12  bg-sky-100 rounded-full text-center">
          {item.user.avatar ? (
            <img src={`${item.user.avatar}`} className="rounded-full" />
          ) : (
            <div className="w-12 h-12 bg-sky-100 rounded-full text-center">
              <h1 className=" text-2xl text-sky-600 ">
                {item.user.name.split(" ").map((item) => item.charAt(0))}
              </h1>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start text-start leading-8">
          <div className="text-xl">{item.user.name}</div>
          <div className="text-gray-400">
            {item.text.slice(0, item.text.indexOf("@"))}
            <span className="text-sky-500">
              {item.text.slice(item.text.indexOf("@"))}
            </span>
          </div>
          <div className="flex gap-4">
            <div
              className={
                item.iLikedIt
                  ? "bg-sky-400 rounded-2xl flex gap-2 justify-center px-4 items-center"
                  : " bg-gray-200 rounded-2xl flex gap-2 justify-center px-4 items-center"
              }
              onClick={() =>
                handelLikeReplay(item.id, item.likes, item.iLikedIt)
              }
            >
              <LikeFilled
                className={item.iLikedIt ? "text-white" : " text-gray-400 "}
              />
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  ));
}
