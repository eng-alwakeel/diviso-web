import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

export const FPS = 30;
const TRANSITION_FRAMES = 20;

type TransitionKind = "fade" | "slide" | "wipe" | "cut";

export type Clip = {
  /** اسم ملف الفيديو داخل مجلد public/ */
  file: string;
  /** كم ثانية يظهر هذا المقطع */
  seconds: number;
  /** من أي ثانية داخل المقطع الأصلي نبدأ (للقص) */
  startFrom?: number;
  /** نص يظهر فوق المقطع */
  title?: string;
  /** الانتقال الذي يسبق هذا المقطع */
  transition?: TransitionKind;
};

export type MontageProps = {
  clips: Clip[];
  /** اسم ملف الموسيقى داخل مجلد public/ */
  music?: string;
};

const transitionElement = (kind: TransitionKind, key: string) => {
  const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

  if (kind === "slide") {
    return (
      <TransitionSeries.Transition
        key={key}
        presentation={slide()}
        timing={timing}
      />
    );
  }

  if (kind === "wipe") {
    return (
      <TransitionSeries.Transition
        key={key}
        presentation={wipe()}
        timing={timing}
      />
    );
  }

  return (
    <TransitionSeries.Transition
      key={key}
      presentation={fade()}
      timing={timing}
    />
  );
};

/**
 * TransitionSeries يدمج كل انتقال مع المقطعين حوله، فمدة الفيديو الكلية
 * هي مجموع المقاطع ناقص مجموع الانتقالات.
 */
export const montageDuration = (clips: Clip[]) => {
  const clipFrames = clips.reduce(
    (total, clip) => total + Math.round(clip.seconds * FPS),
    0
  );
  const transitionFrames = clips
    .slice(1)
    .filter((clip) => clip.transition !== "cut").length * TRANSITION_FRAMES;

  return Math.max(1, clipFrames - transitionFrames);
};

const Title: React.FC<{ text: string; durationInFrames: number }> = ({
  text,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 120,
      }}
    >
      <div
        style={{
          opacity,
          color: "white",
          fontSize: 64,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
          padding: "16px 40px",
          borderRadius: 16,
          background: "rgba(0,0,0,0.55)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const Montage: React.FC<MontageProps> = ({ clips, music }) => {
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <TransitionSeries>
        {clips.flatMap((clip, index) => {
          const clipFrames = Math.round(clip.seconds * FPS);
          const needsTransition = index > 0 && clip.transition !== "cut";

          const sequence = (
            <TransitionSeries.Sequence
              key={`clip-${index}`}
              durationInFrames={clipFrames}
            >
              <OffthreadVideo
                src={staticFile(clip.file)}
                startFrom={
                  clip.startFrom ? Math.round(clip.startFrom * FPS) : undefined
                }
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {clip.title ? (
                <Title text={clip.title} durationInFrames={clipFrames} />
              ) : null}
            </TransitionSeries.Sequence>
          );

          if (!needsTransition) {
            return [sequence];
          }

          return [
            transitionElement(
              clip.transition ?? "fade",
              `transition-${index}`
            ),
            sequence,
          ];
        })}
      </TransitionSeries>

      {music ? (
        <Audio
          src={staticFile(music)}
          volume={(frame) =>
            interpolate(
              frame,
              [durationInFrames - 45, durationInFrames],
              [0.6, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
