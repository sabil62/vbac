import { Label } from "../tailwind/tailwindVariables";
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
                  name="maternal-age"
                  id="maternal-age"
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
                  name="birth-place"
                  id="birth-place"
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
                  name="maternal-bmi"
                  id="maternal-bmi"
                  autoComplete="material-bmi"
                  className={inputClassName}
                />
              </InnerSectionGrid>
              {/* -----------------Number of previous Caesarean Sections------------------------ */}
              <InnerSectionGrid>
                <Label>Number of previous Caesarean Sections</Label>
                <input
                  type="number"
                  name="previous-caesarean"
                  id="previous-caesarean"
                  autoComplete="previous-caesarean"
                  className={inputClassName}
                />
              </InnerSectionGrid>
              {/* -----------------Number of previous Vaginal Births------------------------ */}
              <InnerSectionGrid>
                <Label>Number of Previous Vaginal Birds</Label>
                <input
                  type="number"
                  name="vaginal-births"
                  id="vaginal-births"
                  className={inputClassName}
                />
              </InnerSectionGrid>
              {/* -----------------Gestational Age------------------------ */}
              <InnerSectionGrid>
                <Label>Gestational Age</Label>
                <input
                  type="number"
                  name="gestational-age"
                  id="gestational-age"
                  className={inputClassName}
                  value={"value * 0.233957"}
                />
              </InnerSectionGrid>
              {/* --------------Was the last birth a Caesarean section?------------------ */}
              <InnerSectionGrid>
                <Label>Was the last birth a Caesarean section?</Label>
                <GridTwo>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="caesarean-section"
                      id="caesarean-section1"
                    />

                    <Label inline>Yes</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="caesarean-section"
                      id="caesarean-section2"
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
                      name="onset-labour"
                      id="onset-labour-1"
                      value={0}
                    />
                    <Label inline>Spontaneous</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="onset-labour"
                      id="onset-labour-2"
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
                      name="fetal-presentation"
                      id="fetal1"
                      value={1.400273}
                    />
                    <Label inline>Vertex</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input type="radio" name="fetal-presentation" id="fetal2" />
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
                      name="cervical-ripening"
                      id="cervical1"
                      value={-0.0949787}
                    />
                    <Label inline>Yes</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="cervical-ripening"
                      id="cervical2"
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
                      value={0.191545}
                    />
                    <Label inline>Yes</Label>
                  </GridTwoSub>
                  <GridTwoSub>
                    <input
                      type="radio"
                      name="oxytocin"
                      id="oxytocin2"
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
                    name="gestational-diabeties"
                    value={0.1430483}
                  />
                  <Label inline>
                    Gestational diabetes or pre-existing diabetes
                  </Label>
                </Block>
                <Block>
                  <input
                    type="checkbox"
                    name="Hypertensive-disease"
                    value={-0.1673155}
                  />
                  <Label inline>Hypertensive Disease</Label>
                </Block>
                <Block>
                  <input
                    type="checkbox"
                    name="fetal-anomaly"
                    value={-0.2456491}
                  />
                  <Label inline>Known fetal anomaly</Label>
                </Block>
              </InnerSectionGrid>

              {/* -------------------Analgesia. Please select all that apply.---------------------- */}
              {/* =IF(D33="Epidural or spinal",0,0)+IF(D33="Nitrous or IM
                    narcotic",1.096508,0)+IF(D33="No analgesia",-0.0872948,0) */}
              <InnerSectionGrid fullWidth>
                <Label>Analgesia. Please select all that apply.</Label>
                <GridTwo twelve>
                  <GridTwoSub one>
                    <input
                      type="radio"
                      name="analgesia"
                      id="analgesia1"
                      value={0}
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
                      name="fetal-weight"
                      id="fetalWeight1"
                      value={0}
                    />
                    <Label inline>Under 3000g</Label>
                  </WidthBox>
                  <WidthBox>
                    <input
                      type="radio"
                      name="fetal-weight"
                      id="fetalWeight1"
                      value={0.0612233}
                    />
                    <Label inline>3000 - 3499g</Label>
                  </WidthBox>
                  <WidthBox>
                    <input
                      type="radio"
                      name="fetal-weight"
                      id="fetalWeight1"
                      value={-0.1181972}
                    />
                    <Label inline> 3500-3999g</Label>
                  </WidthBox>
                  <WidthBox>
                    <input
                      type="radio"
                      name="fetal-weight"
                      id="fetalWeight1"
                      value={-0.5706141}
                    />
                    <Label inline>4000g or more</Label>
                  </WidthBox>
                </FlexDisplay>
              </InnerSectionGrid>
              {/* -----------------Parity------------------------ */}
              {/* =IF(D16+D18=1,0,0)+IF(D16+D18=2,-0.1458645,0)+IF(D16+D18>2,0.1307764,0) */}
              {/* if Number of previous Caesarean Sections + Number of previous vaginal births = 1 ? 0
                    if Number of previous Caesarean Sections + Number of previous vaginal births = 2 ? -0.1458645
                    if Number of previous Caesarean Sections + Number of previous vaginal births > 2 ? 0.1307764 */}
              <InnerSectionGrid fullWidth>
                <Label>Parity</Label>
                {/* Line number 107 and 128  */}
              </InnerSectionGrid>
              {/* -----------------Finish------------------------ */}
            </InnerGrid>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </ShadowClass>
      </form>
    </>
  );
}

export default Complete;
