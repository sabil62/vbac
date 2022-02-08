const Footer = () => {
  const goToClevero = () => {
    window.open("https://clevero.co/");
  };
  return (
    <div className="footer px-5 py-3 md:px-8 md:py-4 lg:pr-[4%]">
      <div onClick={goToClevero}>
        Powered by <span>Clevero</span>
      </div>
    </div>
  );
};

export default Footer;
