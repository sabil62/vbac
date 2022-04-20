import ReactGA from "react-ga";

const Footer = () => {
  const goToSabil = () => {
    reactgaevent("Clicked on Powered by Sabil");
  };
  const mailto = () => {
    reactgaevent("Clicked on mail");
    window.open("sabilshrestha62@gmail.com");
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
          <div className="tooltiptitle">sabilshrestha62@gmail.com</div>
        </span>
      </div>
      <div onClick={goToSabil}>
        Powered by <span>Sabil</span>
      </div>
    </div>
  );
};

export default Footer;
