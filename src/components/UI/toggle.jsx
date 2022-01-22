const Toggle = (props) => {
  let leftToogle = "toggle-button";
  let rightToogle = "toggle-button toggle-button-right";
  const dono = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="flex-center">
      <div className="toggle-container" onClick={props.onToggle}>
        <div>Complete</div>
        <div>Antenatal</div>
        <div
          className={props.toggle ? rightToogle : leftToogle}
          onClick={dono}
        ></div>
      </div>
    </div>
  );
};

export default Toggle;
