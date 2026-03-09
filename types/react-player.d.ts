declare module "react-player" {
  import type { ComponentType } from "react";

  export interface ReactPlayerProps {
    url?: string;
    width?: string;
    height?: string;
    controls?: boolean;
    style?: React.CSSProperties;
  }

  const ReactPlayer: ComponentType<ReactPlayerProps>;
  export default ReactPlayer;
}
