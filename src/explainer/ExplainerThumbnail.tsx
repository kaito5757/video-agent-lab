import { AbsoluteFill } from "remotion";

const BRAND = "#3b82f6";

/** YouTubeサムネイル用の静止画コンポーネント(1280x720) */
export const ExplainerThumbnail: React.FC = () => {
  return (
    <AbsoluteFill className="items-center justify-center bg-slate-950 text-white">
      <div className="flex flex-col items-center text-center">
        <div className="text-5xl font-bold tracking-widest text-slate-400">
          5分でわかる
        </div>
        <div
          className="mt-4 text-[220px] leading-none font-black"
          style={{ color: BRAND }}
        >
          Remotion
        </div>
        <div className="mt-10 rounded-full bg-slate-800 px-10 py-4 text-4xl font-semibold text-slate-100">
          動画を React で書く
        </div>
      </div>
    </AbsoluteFill>
  );
};
