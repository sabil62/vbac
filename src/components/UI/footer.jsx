import ReactGA from "react-ga";

const Footer = () => {
  const goToClevero = () => {
    reactgaevent("Clicked on Powered by Clevero");
    window.open("https://clevero.co/");
  };
  const mailto = () => {
    reactgaevent("Clicked on mail");
    window.open("mailto:vbaccalculator@outlook.com");
  };
  const reactgaevent = (act) => {
    ReactGA.event({ category: "Button", action: act });
  };
  return (
    <div className="footer">
      <div className="text-[0.7rem] font-light">
        Questions about the calculators?{" "}
        <span className="large-text">
          {" "}
          <a onClick={mailto}> Contact us here</a>
          <div className="tooltiptitle">vbaccalculator@outlook.com</div>
        </span>
      </div>
      <div onClick={goToClevero}>
        Powered by <span>Clevero</span>
      </div>
    </div>
  );
};

export default Footer;
