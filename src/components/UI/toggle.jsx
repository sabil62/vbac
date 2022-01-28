const Toggle = (props) => {

  let leftToogle = "toggle-button";
  let rightToogle = "toggle-button toggle-button-right";

  let white = "text-white z-[100]";
  const dono = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="flex-center">
      <div className="toggle-container" onClick={props.onToggle}>
        <div className={!props.toggle && white}>Complete</div>
        <div className={props.toggle && white}>Antenatal</div>
        <div
          className={props.toggle ? rightToogle : leftToogle}
          onClick={dono}
        ></div>
      </div>
    </div>
  );
};

export default Toggle;
