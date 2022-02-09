import { useEffect, useRef, useState } from "react";
import {
  BlockA,
  buttonClassName,
  inputClassNameError,
  Label,
  selectClassName,
  selectClassNameError,
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

function Complete() {
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
    analgesia: "",
    fetalWeight: "",
    parity: 0,
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
      } else if (key == "previousCaesarean") {
        newForm[key] = 1;
      } else if (key === "parity") {
        newForm[key] = 0;
      } else if (key === "pregnancy") {
        for (let inKey in newForm[key]) {
          newForm[key][inKey] = 0;
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
      setErrors(newErrObj);
    }

    if (!type) {
      let name = e.target.name;
      let value = e.target.value;
      setFormData({ ...formData, [name]: value });
    } else {
      let newForm = { ...formData };
      if (e.target.name === "none" && e.target.checked) {
        //if none is checked then uncheck all other fields
        for (let inKey in newForm["pregnancy"]) {
          newForm["pregnancy"][inKey] = 0;
          newForm["pregnancy"]["none"] = 0.00001;
        }
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
        errorss[key] = "Cannot Be Empty";
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
        } else {
          total += parseFloat(formData[key]);
        }
        // console.log(key);
        // console.log(formData[key]);
      }
      // console.log(total);
      let variable = Math.exp(-8.091264 + total);
      let answer = variable / (1 + variable);
      setAnswer(answer);
    } else {
      console.log("unsuccessful");
    }
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
        <form action="#" method="POST">
          <Title className="text-stroke">Complete VBAC</Title>
          <ShadowClass>
            <div className="px-4 py-5 bg-white sm:p-6">
              <InnerGrid>
                {/* -----------------maternal age------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label>Maternal Age</Label>

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
                  <Label>Maternal Place of Birth</Label>
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
                    <div className="tooltiptitle" style={toolTipColorStyle}>
                      Body Mass Index
                    </div>
                  </Label>
                  <input
                    type="number"
                    name="maternalBmi"
                    onChange={handleOnChange}
                    value={formData.maternalBmi}
                    title="Body Mass Index"
                    className={
                      errors["maternalBmi"]
                        ? inputClassNameError
                        : inputClassName
                    }
                  />
                </InnerSectionGrid>
                {/* -----------------Number of previous Caesarean Sections------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label className="large-text" style={toolTipColorStyle}>
                    Number of previous Caesarean Sections
                    <div className="tooltiptitle" ref={refSize}>
                      Answer must be 1 or greater, this calculator is only to be
                      used where previous Caesareans sections have occurred
                    </div>
                  </Label>
                  <input
                    type="number"
                    name="previousCaesarean"
                    value={formData.previousCaesarean}
                    onChange={handleOnChange}
                    title="Answer must be 1 or greater, this calculator is only to be used where previous Caesareans sections have occurred"
                    min={1}
                    className={
                      errors["previousCaesarean"]
                        ? inputClassNameError
                        : inputClassName
                    }
                  />
                </InnerSectionGrid>
                {/* -----------------Number of previous Vaginal Births------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label className="large-text" style={toolTipColorStyle}>
                    Number of Previous Vaginal Births
                    <div className="tooltiptitle" ref={refSmall}>
                      Only consider Vaginal Births where Gestational age greater
                      than 20 weeks
                    </div>
                  </Label>
                  <input
                    type="number"
                    name="vaginalBirths"
                    value={formData.vaginalBirths}
                    onChange={handleOnChange}
                    title="Only consider Vaginal Births where Gestational age > than 20 weeks"
                    className={
                      errors["vaginalBirths"]
                        ? inputClassNameError
                        : inputClassName
                    }
                  />
                </InnerSectionGrid>

                {/* --------------Was the last birth a Caesarean section?------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["caesareanSection"]}>
                    Was the last birth a Caesarean section?
                  </Label>
                  <GridTwo>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="caesareanSection"
                        value={-1.390563}
                        onChange={handleOnChange}
                        checked={formData["caesareanSection"] === "-1.390563"}
                      />

                      <Label inline>Yes</Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="caesareanSection"
                        value={0}
                        onChange={handleOnChange}
                        checked={formData["caesareanSection"] === "0"}
                      />
                      <Label inline>No</Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>
                {/* --------Are any of the following known to be present in this pregnancy? Please select all that apply.--- */}
                <InnerSectionGrid fullWidth>
                  <Label>
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
                      />
                      <Label inline>
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
                    />
                    <Label inline>Hypertensive Disease</Label>
                  </Block>
                  <Block>
                    <input
                      type="checkbox"
                      name="fetalAnomaly"
                      value={-0.2456491}
                      onChange={(event) => handleOnChange(event, "pregnancy")}
                      checked={formData["pregnancy"]["fetalAnomaly"]}
                    />
                    <Label inline>Known fetal anomaly</Label>
                  </Block>
                  <Block>
                    <input
                      type="checkbox"
                      name="none"
                      value={0}
                      onChange={(event) => handleOnChange(event, "pregnancy")}
                      checked={formData["pregnancy"]["none"]}
                    />
                    <Label inline>None</Label>
                  </Block>
                </InnerSectionGrid>
                {/* -----------------Gestational Age------------------------ */}

                <InnerSectionGrid fullWidth>
                  <Label>Gestational Age</Label>
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
                  />
                </InnerSectionGrid>
                {/* -----------------Onset of Labour------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["onsetLabour"]}>Onset of Labour</Label>
                  <GridTwo>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="onsetLabour"
                        onChange={handleOnChange}
                        value={0}
                        checked={formData["onsetLabour"] === "0"}
                      />
                      <Label inline>Spontaneous</Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="onsetLabour"
                        onChange={handleOnChange}
                        value={-0.0940149}
                        checked={formData["onsetLabour"] === "-0.0940149"}
                      />
                      <Label inline>Induced</Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>

                {/* -------------------Analgesia. Please select all that apply.---------------------- */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["analgesia"]}>
                    Analgesia. Please select all that apply.
                  </Label>
                  <GridTwo twelve>
                    <GridTwoSub one>
                      <input
                        type="radio"
                        name="analgesia"
                        value={0}
                        onChange={handleOnChange}
                        checked={formData["analgesia"] === "0"}
                      />{" "}
                    </GridTwoSub>
                    <GridTwoSub three>
                      <Label inlineThree>Epidural or spinal analgesia</Label>
                    </GridTwoSub>

                    <GridTwoSub one>
                      <input
                        type="radio"
                        name="analgesia"
                        onChange={handleOnChange}
                        value={1.096508}
                        checked={formData["analgesia"] === "1.096508"}
                      />
                    </GridTwoSub>
                    <GridTwoSub three>
                      <Label inlineThree>
                        Nitrous or IM narcotic Analgesia
                      </Label>
                    </GridTwoSub>

                    <GridTwoSub one>
                      <input
                        type="radio"
                        name="analgesia"
                        id="analgesia3"
                        onChange={handleOnChange}
                        value={-0.0872948}
                        checked={formData["analgesia"] === "-0.0872948"}
                      />
                    </GridTwoSub>
                    <GridTwoSub three>
                      <Label inlineThree>No analgesia</Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>
                {/* -----------------Fetal Presentation------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["fetalPresentation"]}>
                    Fetal Presentation
                  </Label>
                  <GridTwo>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="fetalPresentation"
                        onChange={handleOnChange}
                        value={1.400273}
                        checked={formData["fetalPresentation"] === "1.400273"}
                      />
                      <Label inline>Vertex</Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="fetalPresentation"
                        onChange={handleOnChange}
                        value={0}
                        checked={formData["fetalPresentation"] === "0"}
                      />
                      <Label inline>Non-vertex</Label>
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
                      />
                      <Label inline>Yes</Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="cervicalRipening"
                        onChange={handleOnChange}
                        checked={formData["cervicalRipening"] === "0"}
                        value={0}
                      />
                      <Label inline>No</Label>
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
                      />
                      <Label inline>Yes</Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="oxytocin"
                        onChange={handleOnChange}
                        value={0}
                        checked={formData["oxytocin"] === "0"}
                      />
                      <Label inline>No</Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>

                {/* -----------------Estimated Fetal Weight------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["fetalWeight"]}>
                    Estimated Fetal Weight
                  </Label>
                  <FlexDisplay>
                    <WidthBox>
                      <input
                        type="radio"
                        name="fetalWeight"
                        onChange={handleOnChange}
                        value={0}
                        checked={formData["fetalWeight"] === "0"}
                      />
                      <Label inline>Under 3000g</Label>
                    </WidthBox>
                    <WidthBox>
                      <input
                        type="radio"
                        name="fetalWeight"
                        onChange={handleOnChange}
                        value={0.0612233}
                        checked={formData["fetalWeight"] === "0.0612233"}
                      />
                      <Label inline>3000 - 3499g</Label>
                    </WidthBox>
                    <WidthBox>
                      <input
                        type="radio"
                        name="fetalWeight"
                        onChange={handleOnChange}
                        value={-0.1181972}
                        checked={formData["fetalWeight"] === "-0.1181972"}
                      />
                      <Label inline> 3500-3999g</Label>
                    </WidthBox>
                    <WidthBox>
                      <input
                        type="radio"
                        name="fetalWeight"
                        onChange={handleOnChange}
                        id="fetalWeight1"
                        value={-0.5706141}
                        checked={formData["fetalWeight"] === "-0.5706141"}
                      />
                      <Label inline>4000g or more</Label>
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
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
              >
                Calculate
              </button>
            </div>
          </ShadowClass>
        </form>
        {answer && !Object.keys(errors).length > 0 ? (
          <div className="display-box">
            Likelihood of achieving VBAC is
            <span style={{ fontSize: "1.7rem" }}>
              {" " + (parseFloat(answer) * 100).toFixed(2) + "%"}
            </span>
          </div>
        ) : null}

        {Object.keys(errors).length > 0
          ? displayError && (
              <div className="display-box box-red ">
                Please Complete all the fields
              </div>
            )
          : null}
      </Layout>
    </>
  );
}

export default Complete;
