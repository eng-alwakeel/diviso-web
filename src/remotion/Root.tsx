import { Composition } from "remotion";
import { HelloDiviso } from "./compositions/HelloDiviso";
import {
  Clip,
  FPS,
  Montage,
  MontageProps,
  montageDuration,
} from "./compositions/Montage";

// عدّل هذي القائمة: كل عنصر مقطع من الفيديوهات المولّدة، موجود داخل public/
const clips: Clip[] = [
  { file: "clip-1.mp4", seconds: 4, title: "Diviso" },
  { file: "clip-2.mp4", seconds: 5, transition: "slide" },
  { file: "clip-3.mp4", seconds: 4, transition: "wipe", title: "جرّبه الآن" },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloDiviso"
        component={HelloDiviso}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ title: "Diviso" }}
      />
      <Composition<Record<string, unknown>, MontageProps>
        id="Montage"
        component={Montage}
        fps={FPS}
        width={1920}
        height={1080}
        durationInFrames={montageDuration(clips)}
        defaultProps={{ clips }}
        calculateMetadata={({ props }) => ({
          durationInFrames: montageDuration(props.clips),
        })}
      />
    </>
  );
};
