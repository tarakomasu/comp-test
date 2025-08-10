"use client";

import { useState } from "react";

// ドラッグ可能なテキストエリアコンポーネント
const DraggableTextarea = ({
  initialPosition,
}: {
  initialPosition: { x: number; y: number };
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);

  const onPointerDown = (event: React.PointerEvent<HTMLTextAreaElement>) => {
    setIsDragging(true);
    // ポインターをキャプチャして、要素外にカーソルが出てもmoveイベントを補足し続ける
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLTextAreaElement>) => {
    if (isDragging) {
      setPosition((prevPos) => ({
        x: prevPos.x + event.movementX,
        y: prevPos.y + event.movementY,
      }));
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLTextAreaElement>) => {
    setIsDragging(false);
    // ポインターキャプチャを解放
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleClick = (event: React.PointerEvent<HTMLTextAreaElement>) => {
    console.log("set");
  };

  return (
    <textarea
      rows={2}
      cols={30}
      placeholder="ここにテキストを入力してください"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "lightgray",
        touchAction: "none", // デフォルトのタッチ操作（スクロールなど）を無効化
        cursor: "grab",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={handleClick}
    ></textarea>
  );
};

// メインページコンポーネント
export default function Home() {
  // コンポーネントの状態の型を定義
  type Component = {
    id: number;
    initialPosition: { x: number; y: number };
  };

  const [components, setComponents] = useState<Component[]>([]);
  const [nextId, setNextId] = useState(0);

  // 新しいコンポーネントを追加する関数
  const addComponent = () => {
    const newComponent: Component = {
      id: nextId,
      // 新しいコンポーネントの初期位置を少しずつずらす
      initialPosition: {
        x: 50 + (components.length % 10) * 30,
        y: 50 + (components.length % 10) * 30,
      },
    };
    setComponents([...components, newComponent]);
    setNextId(nextId + 1);
  };

  // フルスクリーンを切り替える関数
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        // エラー処理: ユーザーが許可しなかった場合など
        console.error(
          `Fullscreen request failed: ${err.message} (${err.name})`
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <main>
      <div style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1000, display: "flex", gap: "10px" }}>
        <button
          onClick={addComponent}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          コンポーネントを追加
        </button>
        <button
          onClick={toggleFullScreen}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          全画面表示/解除
        </button>
      </div>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        {components.map((comp) => (
          <DraggableTextarea
            key={comp.id}
            initialPosition={comp.initialPosition}
          />
        ))}
      </div>
    </main>
  );
}
