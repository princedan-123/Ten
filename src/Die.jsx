export default function die(props) {
  const bgColor = props.dieObject.isHeld ? "#59E391" : "#fff";
  return (
    <button
      className="die-button"
      style={{ backgroundColor: bgColor }}
      onClick={props.holdDie}
      aria-label={`A die with a number ${props.dieObject.value} and ${
        props.dieObject.isHeld ? "held" : "not held"
      }`}
    >
      {props.dieObject.value}
    </button>
  );
}
