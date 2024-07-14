import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={254}
    viewBox="0 0 328 254"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="328" height="254" />
  </ContentLoader>
);

export default Skeleton;
