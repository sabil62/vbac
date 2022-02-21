const Footer = () => {
  const goToClevero = () => {
    window.open("https://clevero.co/");
  };
  return (
    <div className="footer">
      <div className="text-[0.7rem] font-light">
        Questions about the calculators?{" "}
        <span className="large-text">
          {" "}
          <a href="maito: vbaccalculator@outlook.com"> Contact us here</a>
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
