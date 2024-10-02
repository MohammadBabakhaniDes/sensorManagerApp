import Skeleton from "react-loading-skeleton";

const SkeletonLoad = ({ count, width }) => {
  return <Skeleton baseColor="#ddd" highlightColor="#f1f1f1" count={count} direction="rtl" duration={2} height={50} width={width} inline={true} style={{}} />;
};

export default SkeletonLoad;
