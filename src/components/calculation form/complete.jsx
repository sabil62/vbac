import { useEffect, useState } from "react";
import { buttonClassName, Label } from "../tailwind/tailwindVariables";
import { InnerGrid } from "../tailwind/tailwindVariables";
import { InnerSectionGrid } from "../tailwind/tailwindVariables";
import { GridTwo } from "../tailwind/tailwindVariables";
import { GridTwoSub } from "../tailwind/tailwindVariables";
import { Block } from "../tailwind/tailwindVariables";
import { FlexDisplay } from "../tailwind/tailwindVariables";
import { WidthBox } from "../tailwind/tailwindVariables";
import { inputClassName } from "../tailwind/tailwindVariables";
import { ShadowClass } from "../tailwind/tailwindVariables";

function Complete() {
  const [answer, setAnswer] = useState("");
  const [formData, setFormData] = useState({
    maternalAge: "",
    birthPlace: "",
    maternalBmi: "", //-0.043509
    previousCaesarean: "", //IF(D16=1,0,0)+IF(D16=2,-1.496422,0)+IF(D16>2,-2.445079,0)
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

  const [errors, setErrors] = useState({});
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleOnChange = (e, type) => {
    if (!type) {
      let name = e.target.name;
      let value = e.target.value;
      setFormData({ ...formData, [name]: value });
    } else {
      let newForm = { ...formData };
      newForm[type][e.target.name] = e.target.value;
      setFormData(newForm);
    }

    if (formData["parity"] === 0) {
      let parityVariable =
        parseInt(formData["previousCaesarean"]) +
        parseInt(formData["vaginalBirths"]);
      handleParity(parityVariable);
    }

    // if (parityVariable === 1) {
    //   setFormData({ ...formData, ["parity"]: 0 });
    // } else if (parityVariable === 2) {
    //   setFormData({ ...formData, ["parity"]: -0.145864 });
    // } else if (parityVariable > 2) {
    //   setFormData({ ...formData, ["parity"]: 0.1307764 });
    // }
  };

  const handleParity = (parityVariable) => {
    if (parityVariable === 1) {
      setFormData({ ...formData, ["parity"]: 0 });
    } else if (parityVariable === 2) {
      setFormData({ ...formData, ["parity"]: -0.145864 });
    } else if (parityVariable > 2) {
      setFormData({ ...formData, ["parity"]: 0.1307764 });
    }
  };

  const handleRefresh = (e) => {
    e.preventDefault();
    for (let keys in formData) {
      console.log(typeof keys);
      if (keys == "pregnancy") {
        for (let insideKeys in formData[keys]) {
          formData[keys][insideKeys] = 0;
        }
      } else {
        formData[keys] = "";
      }
    }
  };

  const handleValidation = (e) => {
    let errorss = {};
    let formIsValid = true;

    for (let key in formData) {
      if (!formData[key]) {
        formIsValid = false;
        console.log(key);
        errorss[key] = "Cannot Be Empty";
      }
    }
    setErrors(errorss);

    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("successful");
      let total = 0;
      for (let key in formData) {
        if (key == "pregnancy") {
          for (let inKey in formData[key]) {
            total += parseFloat(formData[key][inKey]);
          }
        } else if (key == "maternalBmi") {
          total += parseFloat(formData[key]) * -0.043509;
        } else if (key == "previousCaesarean") {
          let value = parseFloat(formData[key]);
          if (value === 2) {
            total += 2;
          } else if (value > 2) {
            total += -2.445079;
          }
        } else if (key == "vaginalBirths") {
          if (parseFloat(formData[key]) > 0) {
            total += 1.167351;
          }
        } else if (key == "gestationalAge") {
          total += parseInt(formData[key]) * 0.233957;
        } else {
          total += parseFloat(formData[key]);
        }
      }
      let variable = Math.exp(-8.091264 + total);
      let answer = variable / (1 + variable);
      setAnswer(answer);
    } else {
      console.log("unsuccessful");
    }
  };

  return (
    <>
      <form action="#" method="POST">
        <ShadowClass>
          <div className="px-4 py-5 bg-white sm:p-6">
            <InnerGrid>
              {/* =IF(D4="Under 30 years",0,0)+IF(D4="30-34
                    years",-0.0339731,0)+IF(D4="35-39
                    years",-0.1801173,0)+IF(D4="40 years or more",-0.5832608,0) */}
              {/* -----------------maternal age------------------------ */}
              <InnerSectionGrid>
                <Label>Maternal Age</Label>

                <select
                  name="maternalAge"
                  id="maternal-age"
                  onChange={handleOnChange}
                  className="mt-1 block w-full py-2 px-3 border-gray-300 bg-white orunded-md shadow-sm focus:outline-none focus:ring-indigo-500 foucs:border-indigo-500 sm:text-sm"
                >
                  <option value="0">Under 30 years</option>
                  <option value="-0.0339731">30-34 years</option>
                  <option value="-0.1801173">35-39 years</option>
                  <option value="-0.5832608">40 years or more</option>
                </select>
              </InnerSectionGrid>
              {/* -----------------maternal place of birth------------------------ */}
              {/* =IF(D9="Australia",0,0)+IF(D9="Europe",-0.1833732,0)+IF(D9="Africa/Middle
                    East",-0.4323789,0)+IF(D9="Asia",-0.3443264,0)+IF(D9="Other",-0.1276015,0) */}
              <InnerSectionGrid>
                <Label>Maternal Place of Birth</Label>
                <select
                  name="birthPlace"
                  id="birth-place"
                  onChange={handleOnChange}
                  className="mt-1 block w-full py-2 px-3 border-gray-300 bg-white orunded-md shadow-sm focus:outline-none focus:ring-indigo-500 foucs:border-indigo-500 sm:text-sm"
                >
                  <option value="0">Australia</option>
                  <option value="-0.1833732">Europe</option>
                  <option value="-0.432378">Africa/Middle East</option>
                  <option value="-0.3443264">Asia</option>
                  <option value="-0.1276015">Other</option>
                </select>
              </InnerSectionGrid>
              {/* -----------------maternal bmi------------------------ */}
              <InnerSectionGrid>
                <Label>Maternal BMI</Label>
                <input
                  type="number"
                  name="maternalBmi"
                  onChange={handleOnChange}
                  value={formData.maternalBmi}
                  id="maternal-bmi"
                  title="Body Mass Index"
                  className={inputClassName}
                />
              </InnerSectionGrid>
              {/* -----------------Number of previous Caesarean Sections------------------------ */}
              <InnerSectionGrid>
                <Label>Number of previous Caesarean Sections</Label>
                <input
                  type="number"
                  name="previousCaesarean"
                  id="previous-caesarean"
                  value={formData.previousCaesarean}
                  onChange={handleOnChange}
                  title="Answer must be 1 or greater, this calculator is only to be used where previous Caesareans sections have occurred"
                  autoComplete="previous-caesarean"
                  className={inputClassName}
                />
              </InnerSectionGrid>
              {/* -----------------Number of previous Vaginal Births------------------------ */}
              <InnerSectionGrid>
                <Label>Number of Previous Vaginal Birds</Label>
                <input
                  type="number"
                  name="vaginalBirths"
                  id="vaginal-births"
                  value={formData.vaginalBirths}
                  onChange={handleOnChange}
                  title="Only consider Vaginal Births where Gestational age > than 20 weeks"
                  className={inputClassName}
                />
              </InnerSectionGrid>
              {/* -----------------Gestational Age------------------------ */}
              <InnerSectionGrid>
                <Label>Gestational Age</Label>
                <input
                  type="number"
                  name="gestationalAge"
                  id="gestational-age"
                  value={formData.gestationalAge}
                  onChange={handleOnChange}
                  className={inputClassName}
                  // value={"0.233957"}
                />
              </InnerSectionGrid>
              {/* --------------Was the last birth a Caesarean section?------------------ */}
              <InnerSectionGrid>
                <Label>Was the last birth a Caesarean section?</Label>
                <GridTwo>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="caesareanSection"
                      id="caesarean-section1"
                      value={-1.390563}
                      onChange={handleOnChange}
                    />

                    <Label inline>Yes</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="caesareanSection"
                      id="caesarean-section2"
                      value={0}
                      onChange={handleOnChange}
                    />
                    <Label inline>No</Label>
                  </GridTwoSub>
                </GridTwo>
              </InnerSectionGrid>
              {/* -----------------Onset of Labour------------------------ */}
              <InnerSectionGrid>
                <Label>Onset of Labour</Label>
                <GridTwo>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="onsetLabour"
                      id="onset-labour-1"
                      onChange={handleOnChange}
                      value={0}
                    />
                    <Label inline>Spontaneous</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="onsetLabour"
                      id="onset-labour-2"
                      onChange={handleOnChange}
                      value={-0.0940149}
                    />
                    <Label inline>Induced</Label>
                  </GridTwoSub>
                </GridTwo>
              </InnerSectionGrid>
              {/* -----------------Fetal Presentation------------------------ */}
              <InnerSectionGrid>
                <Label>Fetal Presentation</Label>
                <GridTwo>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="fetalPresentation"
                      id="fetal1"
                      onChange={handleOnChange}
                      value={1.400273}
                    />
                    <Label inline>Vertex</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="fetalPresentation"
                      id="fetal2"
                      onChange={handleOnChange}
                      value={0}
                    />
                    <Label inline>Non-vertex</Label>
                  </GridTwoSub>
                </GridTwo>
              </InnerSectionGrid>
              {/* -----------------Was cervical ripening used?------------------------ */}
              <InnerSectionGrid>
                <Label>Was cervical ripening used?</Label>
                <GridTwo>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="cervicalRipening"
                      id="cervical1"
                      onChange={handleOnChange}
                      value={-0.0949787}
                    />
                    <Label inline>Yes</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="cervicalRipening"
                      id="cervical2"
                      onChange={handleOnChange}
                      value={0}
                    />
                    <Label inline>No</Label>
                  </GridTwoSub>
                </GridTwo>
              </InnerSectionGrid>
              {/* -------------------Was oxytocin used?---------------------- */}
              <InnerSectionGrid>
                <Label>Was oxytocin used?</Label>
                <GridTwo>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="oxytocin"
                      id="oxytocin1"
                      onChange={handleOnChange}
                      value={0.191545}
                    />
                    <Label inline>Yes</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="oxytocin"
                      id="oxytocin2"
                      onChange={handleOnChange}
                      value={0}
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
                  <input
                    type="checkbox"
                    name="gestationalDiabeties"
                    title="Pre-Existing or Gestational Diabetes"
                    onChange={(event) => handleOnChange(event, "pregnancy")}
                    value={0.1430483}
                  />
                  <Label inline>
                    Gestational diabetes or pre-existing diabetes
                  </Label>
                </Block>
                <Block>
                  <input
                    type="checkbox"
                    name="hypertensiveDisease"
                    value={-0.1673155}
                    onChange={(event) => handleOnChange(event, "pregnancy")}
                  />
                  <Label inline>Hypertensive Disease</Label>
                </Block>
                <Block>
                  <input
                    type="checkbox"
                    name="fetalAnomaly"
                    value={-0.2456491}
                    onChange={(event) => handleOnChange(event, "pregnancy")}
                  />
                  <Label inline>Known fetal anomaly</Label>
                </Block>
                <Block>
                  <input
                    type="checkbox"
                    name="none"
                    value={0}
                    onChange={(event) => handleOnChange(event, "pregnancy")}
                  />
                  <Label inline>None</Label>
                </Block>
              </InnerSectionGrid>

              {/* -------------------Analgesia. Please select all that apply.---------------------- */}
              <InnerSectionGrid fullWidth>
                <Label>Analgesia. Please select all that apply.</Label>
                <GridTwo twelve>
                  <GridTwoSub one>
                    <input
                      type="radio"
                      name="analgesia"
                      id="analgesia1"
                      value={0}
                      onChange={handleOnChange}
                    />{" "}
                  </GridTwoSub>
                  <GridTwoSub three>
                    <Label inlineThree>Epidural or spinal analgesia</Label>
                  </GridTwoSub>

                  <GridTwoSub one>
                    <input
                      type="radio"
                      name="analgesia"
                      id="analgesia2"
                      onChange={handleOnChange}
                      value={1.096508}
                    />
                  </GridTwoSub>
                  <GridTwoSub three>
                    <Label inlineThree>Nitrous or IM narcotic Analgesia</Label>
                  </GridTwoSub>

                  <GridTwoSub one>
                    <input
                      type="radio"
                      name="analgesia"
                      id="analgesia3"
                      onChange={handleOnChange}
                      value={-0.0872948}
                    />
                  </GridTwoSub>
                  <GridTwoSub three>
                    <Label inlineThree>No analgesia</Label>
                  </GridTwoSub>
                </GridTwo>
              </InnerSectionGrid>

              {/* -----------------Estimated Fetal Weight------------------------ */}
              {/* =IF(D46="Under 3000g",0,0)+IF(D46="3000-3499g",0.0612233,0)+IF(D46="3500-3999g",-0.1181972,0)+IF(D46="4000g or more",-0.5706141,0) */}
              <InnerSectionGrid fullWidth>
                <Label>Estimated Fetal Weight</Label>
                <FlexDisplay>
                  <WidthBox>
                    <input
                      type="radio"
                      name="fetalWeight"
                      id="fetalWeight1"
                      onChange={handleOnChange}
                      value={0}
                    />
                    <Label inline>Under 3000g</Label>
                  </WidthBox>
                  <WidthBox>
                    <input
                      type="radio"
                      name="fetalWeight"
                      id="fetalWeight1"
                      onChange={handleOnChange}
                      value={0.0612233}
                    />
                    <Label inline>3000 - 3499g</Label>
                  </WidthBox>
                  <WidthBox>
                    <input
                      type="radio"
                      name="fetalWeight"
                      id="fetalWeight1"
                      onChange={handleOnChange}
                      value={-0.1181972}
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
                    />
                    <Label inline>4000g or more</Label>
                  </WidthBox>
                </FlexDisplay>
              </InnerSectionGrid>
              {/* -----------------Parity------------------------ */}
              {/* =IF(D16+D18=1,0,0)+IF(D16+D18=2,-0.1458645,0)+IF(D16+D18>2,0.1307764,0) */}

              <InnerSectionGrid fullWidth>
                <Label>Parity</Label>
                <Label>{formData.parity}</Label>
                {/* Line number 107 and 128  */}
              </InnerSectionGrid>
              {/* -----------------Finish------------------------ */}
            </InnerGrid>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button className={buttonClassName} onClick={handleRefresh}>
              Refresh
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className={buttonClassName}
            >
              Save
            </button>
          </div>
        </ShadowClass>
      </form>
      <div className="text-2xl">
        {parseFloat(answer).toFixed(4) * 100 + "%"}
      </div>
    </>
  );
}

export default Complete;
