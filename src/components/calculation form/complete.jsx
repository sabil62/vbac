import { useEffect, useRef, useState } from "react";
import {
  BlockA,
  BottomFormFlex,
  buttonClassName,
  clickhere,
  inputClassNameError,
  Label,
  selectClassName,
  selectClassNameError,
  Subtitle,
} from "../tailwind/tailwindVariables";
import { InnerGrid } from "../tailwind/tailwindVariables";
import { InnerSectionGrid } from "../tailwind/tailwindVariables";
import { GridTwo } from "../tailwind/tailwindVariables";
import { GridTwoSub } from "../tailwind/tailwindVariables";
import { Block } from "../tailwind/tailwindVariables";
import { FlexDisplay } from "../tailwind/tailwindVariables";
import { WidthBox } from "../tailwind/tailwindVariables";
import { inputClassName } from "../tailwind/tailwindVariables";
import {
  ShadowClass,
  Title,
  toolTipColorStyle,
} from "../tailwind/tailwindVariables";
import Layout from "../../container/layout";
import Home from "../../image/home.jpg";
import { Link } from "react-router-dom";

function Complete({ setPath }) {
  const [answer, setAnswer] = useState("");

  const [formData, setFormData] = useState({
    maternalAge: "0",
    birthPlace: "0",
    maternalBmi: "", //-0.043509
    previousCaesarean: 1, //IF(D16=1,0,0)+IF(D16=2,-1.496422,0)+IF(D16>2,-2.445079,0)
    vaginalBirths: "", //=IF(D18>0,1.167351,0)+IF(D18=0,0,0)
    gestationalAge: "", //this =D28*0.233957
    caesareanSection: "",
    onsetLabour: "",
    fetalPresentation: "",
    cervicalRipening: "",
    oxytocin: "",
    pregnancy: {
      gestationalDiabeties: 0,
      hypertensiveDisease: 0,
      fetalAnomaly: 0,
      none: 0,
    },
    analgesia: {
      epidural: 0,
      nitrous: 0,
      none: 0,
    },
    fetalWeight: "",
    parity: 0,
  });

  useEffect(() => {
    setPath("complete");
  });

  //useref
  const [size, setSize] = useState({});
  const refSize = useRef(null);

  useEffect(() => {
    const setTheSize = () => {
      setSize({
        height: refSize.current.offsetHeight,
        width: refSize.current.offsetWidth,
      });
    };
    window.addEventListener("resize", setTheSize);
    return () => {
      window.removeEventListener("resize", setTheSize);
    };
  }, [refSize]);

  // useEffect(() => {
  //   if (refBigOne.current) {
  //     console.log(refBigOne.current.offsetWidth);
  //   }
  // }, [refBigOne.current]);

  const [displayError, setDisplayError] = useState(false);

  const [errors, setErrors] = useState({});
  useEffect(() => {}, [errors, displayError]);

  const handleRefresh = (e) => {
    e.preventDefault();
    // window.location.reload();
    setErrors("");
    setDisplayError(false);
    setAnswer("");
    let newForm = { ...formData };
    for (let key in newForm) {
      if (key === "maternalAge" || key === "birthPlace") {
        newForm[key] = "0";
      } else if (key === "previousCaesarean") {
        newForm[key] = 1;
      } else if (key === "parity") {
        newForm[key] = 0;
      } else if (key === "pregnancy") {
        for (let inKey in newForm[key]) {
          newForm[key][inKey] = 0;
        }
      } else if (key === "analgesia") {
        for (let inkey in newForm[key]) {
          newForm[key][inkey] = 0;
        }
      } else {
        newForm[key] = "";
      }
    }
    setFormData(newForm);
  };

  const handleOnChange = (e, type) => {
    if (Object.keys(errors).length > 0) {
      let newErrObj = { ...errors };
      newErrObj[e.target.name] = "";
      newErrObj[type] = "";

      setErrors(newErrObj);
    }

    if (!type) {
      let name = e.target.name;
      let value = e.target.value;
      setFormData({ ...formData, [name]: value });
    } else if (type === "pregnancy") {
      let newForm = { ...formData };
      if (e.target.name === "none" && e.target.checked) {
        //if none is checked then uncheck all other fields
        for (let inKey in newForm["pregnancy"]) {
          newForm["pregnancy"][inKey] = 0;
        }
        // //none should not be 0 as it is clicked
        newForm["pregnancy"]["none"] = 0.00001;
      } else {
        //if other checkboxes are pressed then none should be unchecked
        newForm["pregnancy"]["none"] = 0;
        // newForm[type][e.target.name] = e.target.value;
        if (e.target.checked) {
          newForm[type][e.target.name] = e.target.value;
        } else {
          //if unchecked then remove check icon
          newForm[type][e.target.name] = 0;
        }
      }
      setFormData(newForm);
    } else if (type === "analgesia") {
      let newForm = { ...formData };
      //ppbb
      // newForm["analgesia"][e.target.name] = e.target.value;
      if (e.target.name === "none" && e.target.checked) {
        for (let inkey in newForm["analgesia"]) {
          newForm["analgesia"][inkey] = 0;
        }
        //-0.0872948 because if we click none then thats the value given
        newForm["analgesia"]["none"] = -0.0872948;
      } else {
        newForm["analgesia"]["none"] = 0;
        if (e.target.checked) {
          newForm[type][e.target.name] = e.target.value;
        } else {
          newForm[type][e.target.name] = 0;
        }
      }
      setFormData(newForm);
    }
    // console.log(formData);

    if (formData["parity"] === 0) {
      let parityVariable =
        parseInt(formData["previousCaesarean"]) +
        parseInt(formData["vaginalBirths"]);
      handleParity(parityVariable);
    }
  };

  const handleParity = (parityVariable) => {
    let parity = "parity";
    if (parityVariable === 1) {
      setFormData({ ...formData, [parity]: 0 });
    } else if (parityVariable === 2) {
      setFormData({ ...formData, [parity]: -0.1458645 });
    } else if (parityVariable > 2) {
      setFormData({ ...formData, [parity]: 0.1307764 });
    }
  };

  const handleValidation = (e) => {
    let errorss = {};
    let formIsValid = true;

    for (let key in formData) {
      if (!formData[key]) {
        formIsValid = false;
        errorss[key] = "Please Complete all the fields";
      }
    }
    if (formData["previousCaesarean"] < 1) {
      formIsValid = false;
      errorss["previousCaesarean"] =
        "Previous Caesarean value must be greater than 1";
    }
    if (formData["vaginalBirths"] < 0) {
      formIsValid = false;
      errorss["vaginalBirths"] = "Vaginal Births value must be greater than 0";
    }
    if (formData["maternalBmi"] < 10 || formData["maternalBmi"] > 70) {
      formIsValid = false;
      errorss["maternalBmi"] = "Maternal BMI value should be between 10 and 70";
    }
    if (formData["gestationalAge"] < 37 || formData["gestationalAge"] > 44) {
      formIsValid = false;
      errorss["gestationalAge"] =
        "Gestational Age value should be between 37 and 44";
    }
    if (formData["analgesia"]) {
      let sum = Object.values(formData["analgesia"]).reduce((a, b) => a + b);

      if (sum === 0) {
        formIsValid = false;
        errorss["analgesia"] = "Please select values";
      }
    }
    if (formData["pregnancy"]) {
      let sum = Object.values(formData["pregnancy"]).reduce((a, b) => a + b);
      if (sum === 0) {
        formIsValid = false;
        errorss["pregnancy"] =
          "Please check atleast one in pregnancy conditions";
      }
    }
    // setErrors((prevError) => ({ ...prevError, errorss }));
    setErrors(errorss);

    if (errors) {
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 4000);
    }

    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      // console.log("successful");

      let total = 0;

      for (let key in formData) {
        // console.log(total);
        if (key === "pregnancy") {
          for (let inKey in formData[key]) {
            if (inKey !== "none") {
              total += parseFloat(formData[key][inKey]);
            }
          }
        } else if (key === "maternalBmi") {
          total += parseFloat(formData[key]) * -0.043509;
          // =IF(D16=1,0,0)+IF(D16=2,-1.496422,0)+IF(D16>2,-2.445079,0)
        } else if (key === "previousCaesarean") {
          let value = parseFloat(formData[key]);
          if (value === 2) {
            total += -1.496422;
          } else if (value > 2) {
            total += -2.445079;
          } else if (value === 1) {
            total += 0;
          }
        } else if (key === "vaginalBirths") {
          if (parseFloat(formData[key]) > 0) {
            total += 1.167351;
          }
        } else if (key === "gestationalAge") {
          total += parseInt(formData[key]) * 0.233957;
        } else if (key === "analgesia") {
          for (let inkey in formData["analgesia"]) {
            total += parseFloat(formData["analgesia"][inkey]);
          }
        } else {
          total += parseFloat(formData[key]);
        }
        // console.log(key);
        // console.log(formData[key]);
      }
      // console.log(total);
      let variable = Math.exp(-8.091264 + total);
      let answer = variable / (1 + variable);
      // console.log(answer);
      setAnswer(answer);
    } else {
      console.log("unsuccessful");
    }
  };

  const goHome = () => {
    window.location.href = "/";
  };

  //for scroll wheel in input number
  const stopScroll = (e) => {
    e.target.blur();
  };

  const refSmall = useRef(null);
  // useEffect(() => {}, [refSmall]);
  // if (refSmall.current.offsetWidth < 400) {
  //   console.log(refSmall.current.offsetWidth);
  // }

  // if (refSize.current.offsetWidth < 400) {
  //   console.log(size);
  // }

  return (
    <>
      <Layout>
        <form action="#" method="POST" className="pb-[1rem]">
          <Title hotpink className="text-stroke">
            {" "}
            <span> Complete VBAC calculator</span>
            <span onClick={goHome}>
              <img src={Home} alt="home image" className="image-size" />
            </span>
          </Title>
          <Subtitle>
            The complete calculator is designed for use in labour, and requires
            some variables that are only known in labour. If this calculator is
            not right for you, the{" "}
            <Link to="/antenatal" className={clickhere}>
              antenatal calculator{" "}
            </Link>{" "}
            may be more suitable
          </Subtitle>
          <ShadowClass>
            <div className="px-4 py-5 bg-white sm:p-6">
              <InnerGrid>
                {/* -----------------maternal age------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label>Maternal age</Label>

                  <select
                    name="maternalAge"
                    onChange={handleOnChange}
                    className={
                      errors["maternalAge"]
                        ? selectClassNameError
                        : selectClassName
                    }
                    value={formData["maternalAge"]}
                  >
                    <option value="0">Under 30 years</option>
                    <option value="-0.0339731">30-34 years</option>
                    <option value="-0.1801173">35-39 years</option>
                    <option value="-0.5832608">40 years or more</option>
                  </select>
                </InnerSectionGrid>
                {/* -----------------maternal place of birth------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label>Maternal place of birth</Label>
                  <select
                    name="birthPlace"
                    onChange={handleOnChange}
                    className={
                      errors["birthPlace"]
                        ? selectClassNameError
                        : selectClassName
                    }
                    value={formData["birthPlace"]}
                  >
                    <option value="0">Australia</option>
                    <option value="-0.1833732">Europe</option>
                    <option value="-0.432378">Africa/Middle East</option>
                    <option value="-0.3443264">Asia</option>
                    <option value="-0.1276015">Other</option>
                  </select>
                </InnerSectionGrid>
                {/* -----------------maternal bmi------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label className="large-text">
                    Maternal BMI
                    <span className="opacity-100 md:opacity-0 pl-1 hover:text-blue-800">
                      {" "}
                      &#9432;
                    </span>
                    <div className="tooltiptitle" style={toolTipColorStyle}>
                      Body Mass Index
                    </div>
                  </Label>
                  <input
                    type="number"
                    name="maternalBmi"
                    min={10}
                    max={70}
                    onChange={handleOnChange}
                    value={formData.maternalBmi}
                    title="Body Mass Index"
                    className={
                      errors["maternalBmi"]
                        ? inputClassNameError
                        : inputClassName
                    }
                    onWheel={stopScroll}
                  />
                </InnerSectionGrid>
                {/* -----------------Number of previous Caesarean Sections------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label className="large-text" style={toolTipColorStyle}>
                    Number of previous caesarean sections
                    <span className="opacity-100 md:opacity-0 pl-1 hover:text-blue-800">
                      {" "}
                      &#9432;
                    </span>
                    <div className="tooltiptitle" ref={refSize}>
                      Response must be one or more. This calculator is only
                      suitable for women who have previously had a Caesarean
                      section
                    </div>
                  </Label>
                  <input
                    type="number"
                    min={1}
                    name="previousCaesarean"
                    value={formData.previousCaesarean}
                    onChange={handleOnChange}
                    title="Response must be one or more. This calculator is only suitable for women who have previously had a Caesarean section"
                    className={
                      errors["previousCaesarean"]
                        ? inputClassNameError
                        : inputClassName
                    }
                    onWheel={stopScroll}
                  />
                </InnerSectionGrid>
                {/* -----------------Number of previous Vaginal Births------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label className="large-text" style={toolTipColorStyle}>
                    Number of previous vaginal births
                    <span className="opacity-100 md:opacity-0 pl-1 hover:text-blue-800">
                      {" "}
                      &#9432;
                    </span>
                    <div className="tooltiptitle" ref={refSmall}>
                      Number of previous vaginal births beyond 20 weeks'
                      gestation
                    </div>
                  </Label>
                  <input
                    type="number"
                    name="vaginalBirths"
                    min={37}
                    max={44}
                    value={formData.vaginalBirths}
                    onChange={handleOnChange}
                    title="Number of previous vaginal births beyond 20 weeks' gestation"
                    className={
                      errors["vaginalBirths"]
                        ? inputClassNameError
                        : inputClassName
                    }
                    onWheel={stopScroll}
                  />
                </InnerSectionGrid>

                {/* --------------Was the last birth a Caesarean section?------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["caesareanSection"]}>
                    Was the last birth a caesarean section?
                  </Label>
                  <GridTwo>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="caesareanSection"
                        id="caesareanSection"
                        value={-1.390563}
                        onChange={handleOnChange}
                        checked={formData["caesareanSection"] === "-1.390563"}
                      />

                      <Label inline for="caesareanSection">
                        Yes
                      </Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="caesareanSection"
                        id="caesareanSection2"
                        value={0}
                        onChange={handleOnChange}
                        checked={formData["caesareanSection"] === "0"}
                      />
                      <Label inline for="caesareanSection2">
                        No
                      </Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>
                {/* --------Are any of the following known to be present in this pregnancy? Please select all that apply.--- */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["pregnancy"]}>
                    Are any of the following known to be present in this
                    pregnancy? Please select all that apply.
                  </Label>
                  <Block>
                    <BlockA>
                      <input
                        type="checkbox"
                        name="gestationalDiabeties"
                        title="Pre-Existing or Gestational Diabetes"
                        onChange={(event) => handleOnChange(event, "pregnancy")}
                        value={0.1430483}
                        checked={formData["pregnancy"]["gestationalDiabeties"]}
                        id="gestat"
                      />
                      <Label inline for="gestat">
                        Gestational diabetes or pre-existing diabetes
                      </Label>
                    </BlockA>
                  </Block>
                  <Block>
                    <input
                      type="checkbox"
                      name="hypertensiveDisease"
                      value={-0.1673155}
                      onChange={(event) => handleOnChange(event, "pregnancy")}
                      checked={formData["pregnancy"]["hypertensiveDisease"]}
                      id="hyperten"
                    />
                    <Label inline for="hyperten">
                      Hypertensive disease
                    </Label>
                  </Block>
                  <Block>
                    <input
                      type="checkbox"
                      name="fetalAnomaly"
                      value={-0.2456491}
                      onChange={(event) => handleOnChange(event, "pregnancy")}
                      checked={formData["pregnancy"]["fetalAnomaly"]}
                      id="fetalana"
                    />
                    <Label inline for="fetalana">
                      Known fetal anomaly
                    </Label>
                  </Block>
                  <Block>
                    <input
                      type="checkbox"
                      name="none"
                      value={0}
                      onChange={(event) => handleOnChange(event, "pregnancy")}
                      checked={formData["pregnancy"]["none"]}
                      id="noneCom"
                    />
                    <Label inline for="noneCom">
                      None
                    </Label>
                  </Block>
                </InnerSectionGrid>
                {/* -----------------Gestational Age------------------------ */}

                <InnerSectionGrid fullWidth>
                  <Label className="large-text">
                    Gestational age
                    <span className="opacity-100 md:opacity-0 pl-1 hover:text-blue-800">
                      {" "}
                      &#9432;
                    </span>
                    <div className="tooltiptitle">
                      Response must be between 37 and 44 weeks. This calculator
                      was created based on term singleton births
                    </div>
                  </Label>
                  <input
                    type="number"
                    name="gestationalAge"
                    value={formData.gestationalAge}
                    onChange={handleOnChange}
                    className={
                      errors["gestationalAge"]
                        ? inputClassNameError
                        : inputClassName
                    }
                    title="Response must be between 37 and 44 weeks. This calculator
                    was created based on term singleton births"
                    onWheel={stopScroll}
                  />
                </InnerSectionGrid>
                {/* -----------------Onset of Labour------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["onsetLabour"]}>Onset of labour</Label>
                  <GridTwo>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="onsetLabour"
                        onChange={handleOnChange}
                        value={0}
                        checked={formData["onsetLabour"] === "0"}
                        id="onsetl"
                      />
                      <Label inline for="onsetl">
                        Spontaneous
                      </Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="onsetLabour"
                        onChange={handleOnChange}
                        value={-0.0940149}
                        checked={formData["onsetLabour"] === "-0.0940149"}
                        id="onsetlB"
                      />
                      <Label inline for="onsetlB">
                        Induced
                      </Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>

                {/* -------------------Analgesia. Please select all that apply.---------------------- */}
                <InnerSectionGrid fullWidth>
                  {/* {//ppbb} */}

                  <Label error={errors["analgesia"]}>
                    Analgesia. Please select all that apply.
                  </Label>
                  <FlexDisplay className="px-2 py-[0.2rem] sm:py-[0.6rem] ">
                    <div>
                      <input
                        type="checkbox"
                        name="epidural"
                        value={0}
                        onChange={(event) => handleOnChange(event, "analgesia")}
                        checked={formData["analgesia"]["epidural"] === "0"}
                        id="analC"
                        className="mr-[0.8rem]"
                      />{" "}
                      <Label inlineThree for="analC">
                        Epidural or spinal analgesia
                      </Label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="nitrous"
                        onChange={(event) => handleOnChange(event, "analgesia")}
                        value={1.096508}
                        checked={formData["analgesia"]["nitrous"]}
                        id="analCb"
                        className="mr-[0.8rem]"
                      />
                      <Label inlineThree for="analCb">
                        Nitrous or IM narcotic analgesia
                      </Label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="none"
                        id="analgesia3"
                        onChange={(event) => handleOnChange(event, "analgesia")}
                        value={-0.0872948}
                        checked={formData["analgesia"]["none"]}
                        className="mr-[0.8rem]"
                        id="analCc"
                      />
                      <Label inlineThree for="analCc" className="mr-4">
                        No analgesia
                      </Label>
                    </div>
                  </FlexDisplay>
                </InnerSectionGrid>
                {/* -----------------Fetal Presentation------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["fetalPresentation"]}>
                    Fetal presentation
                  </Label>
                  <GridTwo>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="fetalPresentation"
                        onChange={handleOnChange}
                        value={1.400273}
                        checked={formData["fetalPresentation"] === "1.400273"}
                        id="fetalCa"
                      />
                      <Label inline for="fetalCa">
                        Vertex
                      </Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="fetalPresentation"
                        onChange={handleOnChange}
                        value={0}
                        checked={formData["fetalPresentation"] === "0"}
                        id="fetalCb"
                      />
                      <Label inline for="fetalCb">
                        Non-vertex
                      </Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>
                {/* -----------------Was cervical ripening used?------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["cervicalRipening"]}>
                    Was cervical ripening used?
                  </Label>
                  <GridTwo>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="cervicalRipening"
                        onChange={handleOnChange}
                        value={-0.0949787}
                        checked={formData["cervicalRipening"] === "-0.0949787"}
                        id="cervicalCa"
                      />
                      <Label inline for="cervicalCa">
                        Yes
                      </Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="cervicalRipening"
                        onChange={handleOnChange}
                        checked={formData["cervicalRipening"] === "0"}
                        value={0}
                        id="cervicalCb"
                      />
                      <Label inline for="cervicalCb">
                        No
                      </Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>
                {/* -------------------Was oxytocin used?---------------------- */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["oxytocin"]}>Was oxytocin used?</Label>
                  <GridTwo>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="oxytocin"
                        onChange={handleOnChange}
                        value={0.191545}
                        checked={formData["oxytocin"] === "0.191545"}
                        id="oxytA"
                      />
                      <Label inline for="oxytA">
                        Yes
                      </Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="oxytocin"
                        onChange={handleOnChange}
                        value={0}
                        checked={formData["oxytocin"] === "0"}
                        id="oxytB"
                      />
                      <Label inline for="oxytB">
                        No
                      </Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>

                {/* -----------------Estimated Fetal Weight------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["fetalWeight"]}>
                    Estimated fetal weight
                  </Label>
                  <FlexDisplay>
                    <WidthBox>
                      <input
                        type="radio"
                        name="fetalWeight"
                        onChange={handleOnChange}
                        value={0}
                        checked={formData["fetalWeight"] === "0"}
                        id="fetalA"
                      />
                      <Label inline for="fetalA">
                        Under 3000g
                      </Label>
                    </WidthBox>
                    <WidthBox>
                      <input
                        type="radio"
                        name="fetalWeight"
                        onChange={handleOnChange}
                        value={0.0612233}
                        checked={formData["fetalWeight"] === "0.0612233"}
                        id="fetalB"
                      />
                      <Label inline for="fetalB">
                        3000 - 3499g
                      </Label>
                    </WidthBox>
                    <WidthBox>
                      <input
                        type="radio"
                        name="fetalWeight"
                        onChange={handleOnChange}
                        value={-0.1181972}
                        checked={formData["fetalWeight"] === "-0.1181972"}
                        id="fetalC"
                      />
                      <Label inline for="fetalC">
                        {" "}
                        3500-3999g
                      </Label>
                    </WidthBox>
                    <WidthBox>
                      <input
                        type="radio"
                        name="fetalWeight"
                        onChange={handleOnChange}
                        id="fetalWeight1"
                        value={-0.5706141}
                        checked={formData["fetalWeight"] === "-0.5706141"}
                        id="fetalD"
                      />
                      <Label inline for="fetalD">
                        4000g or more
                      </Label>
                    </WidthBox>
                  </FlexDisplay>
                </InnerSectionGrid>
                {/* -----------------Parity------------------------ */}

                {/* <InnerSectionGrid fullWidth>
                  <Label>Parity</Label>
                  <Label>{formData.parity}</Label> */}
                {/* Line number 107 and 128  */}
                {/* </InnerSectionGrid> */}
                {/* -----------------Finish------------------------ */}
              </InnerGrid>
            </div>
            <BottomFormFlex>
              {answer && !Object.keys(errors).length > 0 ? (
                <div className="text-[0.8rem] lg:text-[1rem]">
                  Likelihood of achieving VBAC is
                  <span className="text-[1.2rem] lg:text-[1.5rem] font-semibold">
                    {" " + Math.floor(answer * 100) + "%"}
                  </span>
                </div>
              ) : (
                <div className="opacity-0">_</div>
              )}
              <div className="flex justify-between items-center">
                <button
                  className={buttonClassName}
                  type="submit"
                  onClick={handleRefresh}
                  style={{ "--main-button-color": "#D9D9D9" }}
                >
                  Refresh
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={buttonClassName}
                  style={{ backgroundColor: "var(--landing-page-main-button)" }}
                >
                  Calculate
                </button>
              </div>
            </BottomFormFlex>
          </ShadowClass>
        </form>

        {Object.keys(errors).length > 0
          ? displayError && (
              <div className="display-box box-red ">
                {/* {Object.keys(errors).map((c) => errors[c])} */}
                {errors[Object.keys(errors)[0]]}
              </div>
            )
          : null}
      </Layout>
    </>
  );
}

export default Complete;
