const Footer = () => {
  const goToClevero = () => {
    window.open("https://clevero.co/");
  };
  return (
    <div className="footer">
      <div className="text-[0.7rem] font-light">
        Questions about the calculators?{" "}
        <span className="vbacspan" href="maito: vbaccalculator@outlook.com">
          {" "}
          Contact us here
        </span>
      </div>
      <div onClick={goToClevero}>
        Powered by <span>Clevero</span>
      </div>
    </div>
  );
};

export default Footer;
