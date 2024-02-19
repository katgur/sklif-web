import { useEffect } from "react";
import { loadImage, displayImage, enable } from "cornerstone-core";

function Viewport({ imageId, viewport, style }) {
  useEffect(() => {
    if (!imageId) {
      return;
    }

    const element = viewport.current;
    enable(element);

    loadImage(imageId).then(image => {
      displayImage(element, image);
    });
  }, [imageId]);

  return (
      <div ref={viewport} style={style}></div>
  );
}

export default Viewport;