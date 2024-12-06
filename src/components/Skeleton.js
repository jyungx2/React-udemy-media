// import classNames from "classnames";

function Skeleton({ times }) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return <div key={i} />;
    });

  // When you return an array of elements directly in React, you need to ensure that the returned elements are properly wrapped in a valid React fragment or parent element.
  return <>{boxes}</>; // Wrapping with Fragment (empty <> </>)
}

export default Skeleton;
