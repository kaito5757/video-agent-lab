import "./index.css";
import { Composition, Still } from "remotion";
import { MyComposition } from "./Composition";
import { ExplainerThumbnail } from "./explainer/ExplainerThumbnail";
import { RemotionExplainer } from "./explainer/RemotionExplainer";
import { RemotionExplainerShort } from "./explainer/RemotionExplainerShort";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="RemotionExplainer"
        component={RemotionExplainer}
        durationInFrames={600}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="RemotionExplainerShort"
        component={RemotionExplainerShort}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Still
        id="ExplainerThumbnail"
        component={ExplainerThumbnail}
        width={1280}
        height={720}
      />
    </>
  );
};
