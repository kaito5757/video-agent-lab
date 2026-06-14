import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const BRAND = "#3b82f6";

/** 入場用の0→1進捗（イーズアウト）を返すフック */
const useEnter = (durationInFrames = 20) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, durationInFrames], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

/** 縦長共通の見出し＋本文レイアウト */
const Slide: React.FC<{
  kicker?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}> = ({ kicker, title, children }) => {
  const enter = useEnter();
  const y = interpolate(enter, [0, 1], [50, 0]);

  return (
    <AbsoluteFill className="items-center justify-center bg-slate-950 px-16 text-white">
      <div
        className="flex w-full flex-col items-center text-center"
        style={{ opacity: enter, transform: `translateY(${y}px)` }}
      >
        {kicker ? (
          <div
            className="mb-6 text-4xl font-semibold tracking-widest uppercase"
            style={{ color: BRAND }}
          >
            {kicker}
          </div>
        ) : null}
        <div className="text-8xl leading-tight font-bold">{title}</div>
        {children ? (
          <div className="mt-12 text-5xl leading-snug text-slate-300">
            {children}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

/** シーン1: タイトル */
const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = interpolate(frame, [0, 0.7 * fps], [0.85, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="items-center justify-center bg-slate-950 px-16 text-white">
      <div
        style={{ opacity, transform: `scale(${pop})` }}
        className="text-center"
      >
        <div className="text-9xl font-black">Remotion</div>
        <div className="mt-8 text-6xl text-slate-300">って何？</div>
      </div>
    </AbsoluteFill>
  );
};

/** シーン2: 一言の定義 */
const SceneWhat: React.FC = () => {
  return (
    <Slide kicker="ひとことで言うと" title={<>動画を React で書くツール</>}>
      HTML と CSS で画面を作る感覚で、
      <br />
      動画が作れる
    </Slide>
  );
};

/** シーン3: frame が画面を決める仕組み（カウンタ実演） */
const SceneFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = useEnter();

  return (
    <AbsoluteFill className="items-center justify-center bg-slate-950 px-16 text-white">
      <div
        className="flex w-full flex-col items-center text-center"
        style={{ opacity: enter }}
      >
        <div
          className="mb-8 text-4xl font-semibold tracking-widest uppercase"
          style={{ color: BRAND }}
        >
          仕組み
        </div>
        <div className="text-7xl leading-tight font-bold">
          いま何フレーム目か
          <br />を React に渡すと
        </div>
        <div className="mt-14 font-mono text-4xl text-slate-400">
          useCurrentFrame()
        </div>
        <div
          className="mt-6 font-mono text-[180px] leading-none font-black tabular-nums"
          style={{ color: BRAND }}
        >
          {(frame < 10 ? "00" : frame < 100 ? "0" : "") + frame}
        </div>
        <div className="mt-8 text-5xl text-slate-300">
          に応じて画面が描き変わる
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** シーン4: interpolate で滑らかに動かす（バー実演） */
const SceneInterpolate: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = useEnter();
  const progress = interpolate(frame, [10, 80], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="items-center justify-center bg-slate-950 px-16 text-white">
      <div
        className="flex w-full flex-col items-center text-center"
        style={{ opacity: enter }}
      >
        <div
          className="mb-8 text-4xl font-semibold tracking-widest uppercase"
          style={{ color: BRAND }}
        >
          interpolate()
        </div>
        <div className="text-7xl leading-tight font-bold">
          数値を補間して
          <br />
          滑らかに動かす
        </div>
        <div className="mt-16 h-12 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full"
            style={{ width: `${progress * 100}%`, backgroundColor: BRAND }}
          />
        </div>
        <div className="mt-8 font-mono text-5xl tabular-nums text-slate-300">
          {Math.round(progress * 100)}%
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** シーン5: コードがそのまま動画になる */
const SceneCode: React.FC = () => {
  const enter = useEnter();
  const lines = [
    "const opacity =",
    "  interpolate(",
    "    frame,",
    "    [0, 30],",
    "    [0, 1]",
    "  );",
    "return (",
    "  <div style={{ opacity }} />",
    ");",
  ];

  return (
    <AbsoluteFill className="items-center justify-center bg-slate-950 px-16 text-white">
      <div
        className="flex w-full flex-col items-center"
        style={{ opacity: enter }}
      >
        <div className="mb-12 text-center text-7xl leading-tight font-bold">
          書いたコードが、
          <br />
          そのまま動画に
        </div>
        <div className="w-full rounded-3xl bg-slate-900 p-10 text-left shadow-2xl ring-1 ring-slate-700">
          {lines.map((line, i) => (
            <div
              key={i}
              className="font-mono text-4xl leading-relaxed text-slate-200"
            >
              {line || " "}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** シーン6: まとめ */
const SceneOutro: React.FC = () => {
  const enter = useEnter(25);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill className="items-center justify-center bg-slate-950 px-16 text-white">
      <div
        className="text-center"
        style={{ opacity: enter, transform: `scale(${scale})` }}
      >
        <div className="text-8xl leading-tight font-black">
          コードで、
          <br />
          動画を作ろう。
        </div>
        <div className="mt-10 text-5xl font-semibold" style={{ color: BRAND }}>
          Remotion
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const RemotionExplainerShort: React.FC = () => {
  return (
    <AbsoluteFill className="bg-slate-950">
      <Sequence durationInFrames={110} premountFor={30}>
        <SceneTitle />
      </Sequence>
      <Sequence from={110} durationInFrames={100} premountFor={30}>
        <SceneWhat />
      </Sequence>
      <Sequence from={210} durationInFrames={110} premountFor={30}>
        <SceneFrame />
      </Sequence>
      <Sequence from={320} durationInFrames={110} premountFor={30}>
        <SceneInterpolate />
      </Sequence>
      <Sequence from={430} durationInFrames={100} premountFor={30}>
        <SceneCode />
      </Sequence>
      <Sequence from={530} durationInFrames={70} premountFor={30}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
