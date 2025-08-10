"use client";

import { useState } from "react";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onPointerDown = (event: React.PointerEvent<HTMLTextAreaElement>) => {
    console.log("onPointerDown");
    // テキストエリアのデフォルトのドラッグ動作（テキスト選択など）を妨げないように、
    // 特定の条件（例: Ctrl/Cmdキーを押しながらドラッグ）でのみドラッグを開始するなどの
    // 工夫が必要になる場合があります。
    // 今回はシンプルに、ポインターがダウンしたらドラッグを開始します。
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLTextAreaElement>) => {
    console.log("onPointermove");
    if (isDragging) {
      setPosition((prevPos) => ({
        x: prevPos.x + event.movementX,
        y: prevPos.y + event.movementY,
      }));
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLTextAreaElement>) => {
    console.log("onPoniterUp");
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <textarea
      rows={5}
      cols={30}
      placeholder="ここにテキストを入力してください"
      style={{
        position: "absolute", // ドラッグ可能にするためにabsolute
        left: position.x,
        top: position.y,
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "lightgray",
        touchAction: "none", // モバイルでのスクロール防止
        cursor: "grab", // ドラッグ可能であることを示すカーソル
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    ></textarea>
  );
}
