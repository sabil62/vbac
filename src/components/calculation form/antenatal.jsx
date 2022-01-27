import React, { useEffect, useState } from "react";
import { buttonClassName, inputClassNameError, Label, selectClassNameError } from "../tailwind/tailwindVariables";
import { InnerGrid } from "../tailwind/tailwindVariables";
import { InnerSectionGrid } from "../tailwind/tailwindVariables";
import { GridTwo, Block } from "../tailwind/tailwindVariables";
import { GridTwoSub } from "../tailwind/tailwindVariables";
import { ShadowClass } from "../tailwind/tailwindVariables";
import { inputClassName } from "../tailwind/tailwindVariables";
import { selectClassName } from "../tailwind/tailwindVariables";

const Antenatal = () => {
  //After form is submit change string to number parseInt()
  const [parity, setParity] = useState(0);
  const [formData, setFormData] = useState({
    maternalAge: 0,
    maternalBirth: 0,
    maternalBmi: "",
    caesarean: 1,
    previousVaginal: "",
    caesareanA: "",
    pregnancy: {
      getstationalDiabeties:0,
      hypertensiveDisease:0,
      fetalAnomally:0,
      none:0
    },
  });

  const [displayError,setDisplayError]=useState(false);

  const [errors, setErrors] = useState({});

  const [answer, setAnswer] = useState("");

  useEffect(() => {}, [errors]);

  const handleOnChange = (e,type) => {
    if (Object.keys(errors).length > 0) {
      setErrors({...errors,[e.target.name]:""})
    }
  
    let name = e.target.name;
    let value = e.target.value;

    if (!type) {
      setFormData({ ...formData, [name]: value });
    } else{
      let newForm = {...formData};
      formData[type][e.target.name] = e.target.value;
      setFormData(newForm);
    }

    
    // console.log(formData);

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
        setDisplayError(false)
      }, 4000);
    }

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
        } else if(key === "pregnancy"){
          for(let inKey in formData[key]){
            total += parseFLoat(formData[key][inKey]);
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
      console.log(total);
    } else {
      console.log("Unsuccessful");
    }
  };
  return (
    <React.Fragment>
      <form action="#" method="POST">
        <ShadowClass>
          <div className="px-4 py-5 bg-white sm:p-6">
            <InnerGrid>
              {/* -----------------maternal age------------------------ */}

              <InnerSectionGrid>
                <Label>Maternal Age</Label>
                <select
                  name="maternalAge"                 
                  className={errors["maternalAge"]?selectClassNameError:selectClassName}
                  onChange={handleOnChange}
                >
                  <option value="0">Under 30 years</option>
                  <option value="-0.0884226">30-34 years</option>
                  <option value="-0.2523265">35-39 years</option>
                  <option value="-0.6299476">40 years or more</option>
                </select>
              </InnerSectionGrid>
              {/* -----------------maternal place of birth------------------------ */}
              <InnerSectionGrid>
                <Label>Maternal place of birth</Label>
                <select
                  name="maternalBirth"
                  className={errors["maternalBirth"]? selectClassNameError:selectClassName}
                  onChange={handleOnChange}
                >
                  <option value="0">Australia</option>
                  <option value="-0.1703068">Europe</option>
                  <option value="-0.3479744">Africa/Middle East</option>
                  <option value="-0.3429032">Asia</option>
                  <option value="-0.0699769">Other</option>
                </select>
              </InnerSectionGrid>
              {/* -----------------maternal BMI------------------------ */}
              <InnerSectionGrid>
                <Label>Maternal BMI</Label>
                <input
                  type="number"
                  name="maternalBmi"
                    value={formData.maternalBmi}
                  title="Body Mass Index"
                  className={errors["maternalBmi"]?inputClassNameError:inputClassName}
                  onChange={handleOnChange}
                />
              </InnerSectionGrid>
              {/* ---------------------Number of previous Caesarean sections------------- */}
              <InnerSectionGrid>
                <Label>Number of previous Caesarean sections</Label>
                <input
                  type="number"
                  name="caesarean"
                  min="1"
                  value={formData.caesarean}
                  className={errors["caesarean"]?inputClassNameError:inputClassName}
                  onChange={handleOnChange}
                  title="This calculator is to be used by previous Caesareanb"
                />
              </InnerSectionGrid>
              {/* -----------------------Number of previous vaginal births------------- */}
              <InnerSectionGrid>
                <Label>Numer of previous Vaginal Births</Label>
                <input
                  type="number"
                  name="previousVaginal"
                  title="Vaginal Births Greater than 20 weeks"
                  value={formData.previousVaginal}
                  onChange={handleOnChange}
                  className={errors["previousVaginal"]?inputClassNameError:inputClassName}
                />
              </InnerSectionGrid>
              {/* ---------------------------Was the last birth a Caesarean section?----------- */}
              <InnerSectionGrid>
                <Label error={errors["caesareanA"]}>Was the last birth a Caesarean section?</Label>
                <GridTwo>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="caesareanA"
                      id="caesarean-a1"
                      value={-1.35218}
                      onChange={handleOnChange}
                    />
                    <Label inline>Yes</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="caesareanA"
                      id="caesarean-b1"
                      value={0}
                      onChange={handleOnChange}
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
                    <input type="checkbox" name="gestationalDiabeties" value={0.0514722} onChange={(event)=>handleOnChange(event,"pregnancy")}/>
                    <Label inline>Diabetes</Label>
                  </Block>
                  <Block>
                  <input type="checkbox" name="hypertensiveDisease" value={-0.164456} onChange={(event)=>handleOnChange(event,"pregnancy")} />
                  <Label inline>Hypertensive DIsease</Label>
                  </Block>
                  <Block>
                  <input type="checkbox" name="fetalAnomaly" value={-0.2731908} onChange={(event)=>handleOnChange(event,"pregnancy")} />
                  <Label inline>KNown fetal anomaly</Label>
                  </Block>
                  <Block>
                  <input type="checkbox" name="none" value={0} onChange={(event) => handleOnChange(event, "pregnancy")}/>
                  <Label inline>None</Label>
                  </Block>
                  {/* <option value={0.0514722}>Diabetes</option>
                  <option value={-0.164456}>Hypertensive disease</option>
                  <option value={-0.2731908}>Known fetal anomaly</option>
                  <option value={0}>None</option> */}
               
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
            <button type="submit" className={buttonClassName}>
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
      {answer ? (
        <div className="display-box">
          {" "}
          Likelihood of achieving VBAC is
          <span style={{ fontSize: "1.7rem" }}>
            {" " + (parseFloat(answer) * 100).toFixed(2) + "%"}
          </span>
        </div>
      ) : null}
      {Object.keys(errors).length > 0 ? (
        displayError &&
        <div className="display-box box-red">
          Please Complete all the Fields
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Antenatal;
