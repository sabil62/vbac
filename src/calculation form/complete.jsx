function Complete() {
  return (
    <>
      <div className="mt-10 sm:mt-6">
        <div className="md:grid md:grid-cols-6 md:gap-6 lg:grid-cols-8">
          <div className="lg:col-span-2 md:col-span-1"></div>
          <div className="mt-5 md:mt-0 md:col-span-4">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* =IF(D4="Under 30 years",0,0)+IF(D4="30-34
                    years",-0.0339731,0)+IF(D4="35-39
                    years",-0.1801173,0)+IF(D4="40 years or more",-0.5832608,0) */}
                    {/* -----------------maternal age------------------------ */}
                    <div className="col-span-6 lg:col-span-3">
                      <label
                        htmlFor="maternal-age"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Maternal Age
                      </label>
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
                    </div>
                    {/* -----------------maternal place of birth------------------------ */}
                    {/* =IF(D9="Australia",0,0)+IF(D9="Europe",-0.1833732,0)+IF(D9="Africa/Middle
                    East",-0.4323789,0)+IF(D9="Asia",-0.3443264,0)+IF(D9="Other",-0.1276015,0) */}
                    <div className="col-span-6 lg:col-span-3">
                      <label
                        htmlFor="birth-place"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Maternal Place of Birth
                      </label>
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
                    </div>
                    {/* -----------------maternal bmi------------------------ */}
                    <div className="col-span-6 lg:col-span-3">
                      <label
                        htmlFor="maternal-bmi"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Maternal BMI
                      </label>
                      <input
                        type="number"
                        name="maternal-bmi"
                        id="maternal-bmi"
                        autoComplete="material-bmi"
                        className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
                      />
                    </div>
                    {/* -----------------Number of previous Caesarean Sections------------------------ */}
                    <div className="col-span-6 lg:col-span-3">
                      <label
                        htmlFor="previous-caesarean"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number of previous Caesarean Sections
                      </label>
                      <input
                        type="number"
                        name="previous-caesarean"
                        id="previous-caesarean"
                        autoComplete="previous-caesarean"
                        className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
                      />
                    </div>
                    {/* -----------------Number of previous Vaginal Births------------------------ */}
                    <div className="col-span-6 lg:col-span-3">
                      <label htmlFor="vaginal-births">
                        Number of Previous Vaginal Birds
                      </label>
                      <input
                        type="number"
                        name="vaginal-births"
                        id="vaginal-births"
                        className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md block focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
                      />
                    </div>
                    {/* -----------------Gestational Age------------------------ */}
                    <div className="col-span-6 lg:col-span-3">
                      <label htmlFor="gestational-age">Gestational Age</label>
                      <input
                        type="number"
                        name="gestational-age"
                        id="gestational-age"
                        className="p-2 mt-1 w-full block border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    {/* -----------------New------------------------ */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2 md:col-span-1"></div>
        </div>
      </div>
    </>
  );
}

export default Complete;
