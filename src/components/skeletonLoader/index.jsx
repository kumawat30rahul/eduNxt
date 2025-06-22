import "./skeletonLoader.css";

const SkeletonLoader = ({ height, width }) => {
  return (
    <div
      class="skeleton-loader"
      style={{
        height,
        width,
      }}
    ></div>
  );
};

export default SkeletonLoader;
