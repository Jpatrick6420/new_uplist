/* eslint-disable react/prop-types */
import { titleCase } from "../helper_functions/helpers";
function Uplist({ uplist }) {
  return (
    <ul>
      {uplist.length !== 0 &&
        uplist.map((item, idx) => {
          return <li key={idx + 1}>{`${idx + 1}) ${titleCase(item)}`}</li>;
        })}
    </ul>
  );
}

export default Uplist;
