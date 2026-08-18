import { Composition } from "remotion";
import { HelloDiviso } from "./compositions/HelloDiviso";

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
    </>
  );
};
