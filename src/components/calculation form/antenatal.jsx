import { Label } from "../tailwind/tailwindVariables";
import { InnerGrid } from "../tailwind/tailwindVariables";
import { InnerSectionGrid } from "../tailwind/tailwindVariables";
import { GridTwo } from "../tailwind/tailwindVariables";
import { GridTwoSub } from "../tailwind/tailwindVariables";
import { ShadowClass } from "../tailwind/tailwindVariables";
import { inputClassName } from "../tailwind/tailwindVariables";
import { selectClassName } from "../tailwind/tailwindVariables";

const Antenatal = () => {
  return (
    <form action="#" method="POST">
      <ShadowClass>
        <div className="px-4 py-5 bg-white sm:p-6">
          <InnerGrid>
            {/* -----------------maternal age------------------------ */}
            {/* =IF(C4="Under 30 years",0,0)+IF(C4="30-34
            years",-0.0884226,0)+IF(C4="35-39 years",-0.2523265,0)+IF(C4="40
            years or more",-0.6299476,0) */}
            <InnerSectionGrid>
              <Label>Maternal Age</Label>
              <select
                name="maternal-age"
                id="maternal-age-a"
                className={selectClassName}
              >
                <option value="0">Under 30 years</option>
                <option value="-0.0884226">30-34 years</option>
                <option value="-0.2523265">35-39 years</option>
                <option value="-0.6299476">40 years or more</option>
              </select>
            </InnerSectionGrid>
            {/* -----------------maternal place of birth------------------------ */}
            {/* =IF(C9="Australia",0,0)+IF(C9="Europe",-0.1703068,0)+IF(C9="Africa/Middle
            East",-0.3479744,0)+IF(C9="Asia",-0.3429032,0)+IF(C9="Other",-0.0699769,0) */}
            <InnerSectionGrid>
              <Label>Maternal place of birth</Label>
              <select
                name="maternal-birth"
                id="maternal-birth-a"
                className={selectClassName}
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
                name="maternal-bmi"
                value={-0.0450591}
                title="Body Mass Index"
                className={inputClassName}
              />
            </InnerSectionGrid>
            {/* ---------------------Number of previous Caesarean sections------------- */}
            {/* =IF(C17=1,0,0)+IF(C17=2,-1.755666,0)+IF(C17>2,-2.910313,0) */}
            <InnerSectionGrid>
              <Label>Number of previous Caesarean sections</Label>
              <input
                type="number"
                name="caesarean"
                min="1"
                className={inputClassName}
                title="This calculator is to be used by previous Caesareanb"
              />
            </InnerSectionGrid>
            {/* -----------------------Number of previous vaginal births------------- */}
            {/* =IF(C19>0,1.126513,0)+IF(C19=0,0,0) */}
            <InnerSectionGrid>
              <Label>Numer of previous Vaginal Births</Label>
              <input
                type="number"
                name="previous-vaginal"
                title="Vaginal Births Greater than 20 weeks"
              />
            </InnerSectionGrid>
            {/* ---------------------------Was the last birth a Caesarean section?----------- */}
            <InnerSectionGrid>
              <Label>Was the last birth a Caesarean section?</Label>
              <GridTwo>
                <GridTwoSub>
                  <input type="radio" name="caesarean-a" id="caesarean-a1" />
                  <Label inline>Yes</Label>
                </GridTwoSub>
                <GridTwoSub>
                  <input type="radio" name="caesarean-a" id="caesarean-b1" />
                  <Label inline>No</Label>
                </GridTwoSub>
              </GridTwo>
            </InnerSectionGrid>
            {/* --------Are any of the following known to be present in this pregnancy? Please select all that apply.-----  */}
            <InnerSectionGrid fullWidth>
              <Label>
                Are any of the following known to be present in this pregnancy?
                Please select all that apply.
              </Label>
              <select
                name="pregnancy"
                id="pregnancy"
                className={selectClassName}
                title="Pre-Existing or Gestational Diabetes"
              >
                <option value={0.0514722}>Diabetes</option>
                <option value={-0.164456}>Hypertensive disease</option>
                <option value={-0.2731908}>Known fetal anomaly</option>
                <option value={0}>None</option>
              </select>
            </InnerSectionGrid>
            {/* ----------------------Parity------------------- */}
            {/* =IF(C17+C19=1,0,0)+IF(C17+C19=2,-0.1637306,0)+IF(C17+C19>2,0.0923186,0) */}
            <InnerSectionGrid>
              <Label>Parity</Label>
              <div>{"parity calculate"}</div>
            </InnerSectionGrid>
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
  );
};

export default Antenatal;
