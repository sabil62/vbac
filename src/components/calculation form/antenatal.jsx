import React, { useEffect, useState } from "react";
import { useRef } from "react/cjs/react.development";
import {
  buttonClassName,
  inputClassNameError,
  Label,
  selectClassNameError,
} from "../tailwind/tailwindVariables";
import { InnerGrid, Title } from "../tailwind/tailwindVariables";
import { InnerSectionGrid } from "../tailwind/tailwindVariables";
import { GridTwo, Block } from "../tailwind/tailwindVariables";
import { GridTwoSub } from "../tailwind/tailwindVariables";
import { ShadowClass } from "../tailwind/tailwindVariables";
import { inputClassName } from "../tailwind/tailwindVariables";
import { selectClassName } from "../tailwind/tailwindVariables";

import Layout from "../../container/layout";

const Antenatal = () => {
  //After form is submit change string to number parseInt()
  const [parity, setParity] = useState(0);
  const [formData, setFormData] = useState({
    maternalAge: "0",
    maternalBirth: "0",
    maternalBmi: "",
    caesarean: 1,
    previousVaginal: "",
    caesareanA: "",
    pregnancy: {
      gestationalDiabeties: 0,
      hypertensiveDisease: 0,
      fetalAnomally: 0,
      none: 0,
    },
  });

  const handleRefresh = (e) => {
    e.preventDefault();
    // window.location.reload();
    let newForm = { ...formData };
    for (let key in newForm) {
      if (key === "maternalAge" || key === "maternalBirth") {
        newForm[key] = "0";
      } else if (key === "caesarean") {
        newForm[key] = 1;
      } else if (key === "pregnancy") {
        for (let inKey in newForm[key]) {
          newForm[key][inKey] = 0;
        }
      } else {
        newForm[key] = "";
      }
    }
    setFormData(newForm);

    setAnswer("");
    setErrors("");
    setDisplayError(false);
    setParity(0);
  };

  const [displayError, setDisplayError] = useState(false);

  const [errors, setErrors] = useState({});

  const [answer, setAnswer] = useState("");

  useEffect(() => {}, [errors, parity]);

  const handleOnChange = (e, type) => {
    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors, [e.target.name]: "" });
    }

    let name = e.target.name;
    let value = e.target.value;

    if (!type) {
      setFormData({ ...formData, [name]: value });
    } else {
      //multiple option checked
      let newForm = { ...formData };
      if (name === "none" && e.target.checked) {
        // console.log("none checked")
        for (let inKey in newForm["pregnancy"]) {
          newForm["pregnancy"][inKey] = 0;
          newForm["pregnancy"]["none"] = 0.00001; //setting none only true so that it can be checked
        }
      } else {
        // console.log(e.target.checked);
        if (e.target.checked) {
          //if individual option is checked then put its data
          newForm[type][e.target.name] = e.target.value;
        } else {
          //else uncheck the checkbox
          newForm[type][e.target.name] = 0;
        }
        newForm[type]["none"] = 0;
      }

      setFormData(newForm);
    }

    // console.log(formData);
    // console.log(parity);

    let parityValue =
      parseInt(formData["caesarean"]) + parseInt(formData["previousVaginal"]);
    // console.log(parityValue);

    handleParity(parityValue);
  };

  const handleParity = (parityValue) => {
    let parit = 0;
    if (parityValue === 1) {
      parit = 0;
    } else if (parityValue === 2) {
      parit = -0.1637306;
    } else if (parityValue > 2) {
      parit = 0.0923186;
    }
    setParity(parit);
  };

  const handleValidation = () => {
    let isFormValid = true;
    let errs = {};

    for (let key in formData) {
      if (!formData[key]) {
        errs[key] = "Complete the form ";
        isFormValid = false;
      }
    }
    setErrors(errs);

    if (errors) {
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 4000);
    }

    // console.log(errors);

    return isFormValid;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      let total = 0;
      for (let key in formData) {
        if (key === "maternalBmi") {
          total += parseFloat(formData[key]) * -0.0450591;
        } else if (key === "caesarean") {
          let prevCae = parseInt(formData[key]);
          if (prevCae === 1) {
            total += 0;
          } else if (prevCae === 2) {
            total += -1.755666;
          } else if (prevCae > 2) {
            total += -2.910313;
          }
        } else if (key === "previousVaginal") {
          let preVa = parseInt(formData[key]);
          if (preVa === 0) {
            total += 0;
          } else if (preVa > 1) {
            total += 1.126513;
          }
        } else if (key === "pregnancy") {
          for (let inKey in formData[key]) {
            if (inKey !== "none") {
              total += parseFloat(formData[key][inKey]);
            }
          }
        } else {
          total += parseFloat(formData[key]);
          // console.log(total);
        }
      }
      total += parity;
      let expAns = Math.exp(2.801237 + total);
      let ans = expAns / (1 + expAns);
      setAnswer(ans);
      // console.log(total);
    } else {
      console.log("Unsuccessful");
    }
  };

  //useRef
  const refUse = useRef(null);
  const [size, setSize] = useState({});

  useEffect(() => {
    const hanldeWidth = () => {
      setSize({
        height: refUse.current.offsetHeight,
        width: refUse.current.offsetWidth,
      });
    };
    window.addEventListener("resize", hanldeWidth);
    return () => {
      window.removeEventListener("resize", hanldeWidth);
    };
  }, [refUse]);

  // if (size.width < 500) {
  //   console.log(size);
  // }

  return (
    <React.Fragment>
      <Layout>
        <form action="#" method="POST">
          <Title className="text-stroke">Antenatal VBAC</Title>
          <ShadowClass>
            <div className="px-4 py-5 bg-white sm:p-6" ref={refUse}>
              <InnerGrid>
                {/* -----------------maternal age------------------------ */}

                <InnerSectionGrid fullWidth>
                  <Label>Maternal Age</Label>
                  <select
                    name="maternalAge"
                    className={
                      errors["maternalAge"]
                        ? selectClassNameError
                        : selectClassName
                    }
                    onChange={handleOnChange}
                    value={formData["maternalAge"]}
                  >
                    <option value="0">Under 30 years</option>
                    <option value="-0.0884226">30-34 years</option>
                    <option value="-0.2523265">35-39 years</option>
                    <option value="-0.6299476">40 years or more</option>
                  </select>
                </InnerSectionGrid>
                {/* -----------------maternal place of birth------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label>Maternal place of birth</Label>
                  <select
                    name="maternalBirth"
                    className={
                      errors["maternalBirth"]
                        ? selectClassNameError
                        : selectClassName
                    }
                    onChange={handleOnChange}
                    //the value is only needed for refresh
                    value={formData["maternalBirth"]}
                  >
                    <option value="0">Australia</option>
                    <option value="-0.1703068">Europe</option>
                    <option value="-0.3479744">Africa/Middle East</option>
                    <option value="-0.3429032">Asia</option>
                    <option value="-0.0699769">Other</option>
                  </select>
                </InnerSectionGrid>
                {/* -----------------maternal BMI------------------------ */}
                <InnerSectionGrid fullWidth>
                  <Label className="large-text">
                    Maternal BMI
                    <div className="tooltiptitle">Body Mass Index</div>
                  </Label>
                  <input
                    type="number"
                    name="maternalBmi"
                    value={formData.maternalBmi}
                    title="Body Mass Index"
                    className={
                      errors["maternalBmi"]
                        ? inputClassNameError
                        : inputClassName
                    }
                    onChange={handleOnChange}
                  />
                </InnerSectionGrid>
                {/* ---------------------Number of previous Caesarean sections------------- */}
                <InnerSectionGrid fullWidth>
                  <Label className="large-text">
                    Number of previous Caesarean sections
                    <div className="tooltiptitle">
                      This calculatior is to be used by previous Caesarean
                    </div>
                  </Label>
                  <input
                    type="number"
                    name="caesarean"
                    min="1"
                    value={formData.caesarean}
                    className={
                      errors["caesarean"] ? inputClassNameError : inputClassName
                    }
                    onChange={handleOnChange}
                    title="This calculator is to be used by previous Caesarean"
                  />
                </InnerSectionGrid>
                {/* -----------------------Number of previous vaginal births------------- */}
                <InnerSectionGrid fullWidth>
                  <Label className="large-text">
                    Number of previous Vaginal Births{" "}
                    <div className="tooltiptitle">
                      Vaginal BIrths Greather than 20 weeks
                    </div>{" "}
                  </Label>
                  <input
                    type="number"
                    name="previousVaginal"
                    title="Vaginal Births Greater than 20 weeks"
                    value={formData.previousVaginal}
                    onChange={handleOnChange}
                    className={
                      errors["previousVaginal"]
                        ? inputClassNameError
                        : inputClassName
                    }
                  />
                </InnerSectionGrid>
                {/* ---------------------------Was the last birth a Caesarean section?----------- */}
                <InnerSectionGrid fullWidth>
                  <Label error={errors["caesareanA"]}>
                    Was the last birth a Caesarean section?
                  </Label>
                  <GridTwo>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="caesareanA"
                        value={-1.35218}
                        onChange={handleOnChange}
                        checked={formData["caesareanA"] === "-1.35218"}
                      />
                      <Label inline>Yes</Label>
                    </GridTwoSub>
                    <GridTwoSub>
                      <input
                        type="radio"
                        name="caesareanA"
                        value={0}
                        onChange={handleOnChange}
                        checked={formData["caesareanA"] === "0"}
                      />
                      <Label inline>No</Label>
                    </GridTwoSub>
                  </GridTwo>
                </InnerSectionGrid>
                {/* --------Are any of the following known to be present in this pregnancy? Please select all that apply.-----  */}
                <InnerSectionGrid fullWidth>
                  <Label>
                    Are any of the following known to be present in this
                    pregnancy? Please select all that apply.
                  </Label>

                  <Block>
                    <input
                      type="checkbox"
                      name="gestationalDiabeties"
                      value={0.0514722}
                      onChange={(event) => handleOnChange(event, "pregnancy")}
                      checked={formData["pregnancy"]["gestationalDiabeties"]}
                    />
                    <Label inline>Diabetes</Label>
                  </Block>
                  <Block>
                    <input
                      type="checkbox"
                      name="hypertensiveDisease"
                      value={-0.164456}
                      onChange={(event) => handleOnChange(event, "pregnancy")}
                      checked={formData["pregnancy"]["hypertensiveDisease"]}
                    />
                    <Label inline>Hypertensive DIsease</Label>
                  </Block>
                  <Block>
                    <input
                      type="checkbox"
                      name="fetalAnomally"
                      value={-0.2731908}
                      onChange={(event) => handleOnChange(event, "pregnancy")}
                      checked={formData["pregnancy"]["fetalAnomally"]}
                    />
                    <Label inline>Known fetal anomaly</Label>
                  </Block>
                  <Block>
                    <input
                      type="checkbox"
                      name="none"
                      value={1}
                      onChange={(event) => handleOnChange(event, "pregnancy")}
                      checked={formData["pregnancy"]["none"]}
                    />
                    <Label inline>None</Label>
                  </Block>
                </InnerSectionGrid>
                {/* ----------------------Parity------------------- */}
                {/* =IF(C17+C19=1,0,0)+IF(C17+C19=2,-0.1637306,0)+IF(C17+C19>2,0.0923186,0) */}
                <InnerSectionGrid>
                  <Label>Parity</Label>
                  <div>{parity}</div>
                </InnerSectionGrid>
              </InnerGrid>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                className={buttonClassName}
                onClick={handleRefresh}
                style={{ "--main-button-color": "#D9D9D9" }}
              >
                Refresh
              </button>
              <button
                type="submit"
                className={buttonClassName}
                onClick={handleOnSubmit}
              >
                Calculate
              </button>
            </div>
          </ShadowClass>
        </form>
        {answer && !Object.keys(errors).length > 0 ? (
          <div className="display-box">
            {" "}
            Likelihood of achieving VBAC is
            <span style={{ fontSize: "1.7rem" }}>
              {" " + (parseFloat(answer) * 100).toFixed(2) + "%"}
            </span>
          </div>
        ) : null}
        {Object.keys(errors).length > 0
          ? displayError && (
              <div className="display-box box-red">
                Please Complete all the Fields
              </div>
            )
          : null}
      </Layout>
    </React.Fragment>
  );
};

export default Antenatal;
