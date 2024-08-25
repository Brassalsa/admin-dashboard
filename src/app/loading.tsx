import React from "react";

function Loading() {
  const className = "h-2.5 w-2.5 rounded-full bg-muted-foreground";
  return (
    <div className="flex space-x-1 w-40 absolute top-[45%] left-[45%]">
      <div className={`${className} animate-bounce`}></div>
      <div className={`${className} animate-bounce delay-200`}></div>
      <div className={`${className} animate-bounce delay-400`}></div>
    </div>
  );
}

export default Loading;
