import { ThreeDots } from "react-loader-spinner";

function Loader({w} : {w?: number}) {
  return (
    <ThreeDots
      color="#32A6FE"
      height={ w || 45}
      ariaLabel="three-dots-loading"
      visible={true}
      wrapperStyle={{ margin: "auto" }}
    />
  );
}

export default Loader;