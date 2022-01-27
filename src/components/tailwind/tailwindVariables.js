import tw, { styled } from "twin.macro";

//fads
export const Label = styled.label(({ inline, inlineThree, error }) => [
  tw`block text-sm font-medium text-gray-700`,
  inline && tw`inline-block pl-[0.5rem] sm:pl-[1rem] text-sm md:text-base font-normal`,
  inlineThree && tw`inline-block md:text-base text-sm font-normal p-0`,
  error && tw`text-red-700`
]);

export const Grid = styled.div(({ grid8 }) => [
  tw`md:grid md:grid-cols-6 lg:grid-cols-10 md:gap-6`,
  grid8 && tw`grid`,
]);


export const GridOffset = tw.div`md:col-span-1 lg:col-span-2`;

export const GridContent = tw.div`md:col-span-4 lg:col-span-6 mt-5 sm:mt-6`;

export const InnerGrid = tw.div`grid grid-cols-6 gap-6 p-2`;

export const InnerSectionGrid = styled.div(({ fullWidth }) => [
  tw`col-span-6 lg:col-span-3 px-6 py-2 md:(p-0 pt-3)`,
  fullWidth && tw`lg:col-span-6`,
]);

export const GridTwo = styled.div(({ three, twelve }) => [
  tw`grid grid-cols-4 p-2 pt-3 gap-2`,
  three && tw`grid-cols-6`,
  twelve && tw`grid-cols-12 `,
]);

export const GridTwoSub = styled.div(({ one, three, four }) => [
  tw`col-span-2`,
  one && tw`col-span-1 lg:pl-6 md:pl-5 sm:pl-2 `,
  three && tw`col-span-3`,
  four && tw`col-span-4`,
]);

export const Block = tw.div`block my-1`;
export const BlockA = tw.div`flex items-center`;
export const FlexDisplay = tw.div`flex justify-between flex-wrap`;

export const WidthBox = styled.div(({ five, six }) => [
  tw`w-[10rem] mt-3`,
  five && tw`w-[5rem]`,
  six && tw`w-[6rem]`,
]);

export const ShadowClass = tw.div`shadow md:shadow-xl overflow-hidden sm:rounded-md`;

//classNames
export const inputClassName =
  "mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md";

export const inputClassNameError =
  "mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-red-400 rounded-md bg-red-100";

export const selectClassName =
  "mt-1 block w-full py-2 px-3 border-gray-300 bg-white orunded-md shadow-sm focus:outline-none focus:ring-indigo-500 foucs:border-indigo-500 sm:text-sm rounded-md";

export const selectClassNameError = "mt-1 block w-full py-2 px-3 border-2 border-red-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 foucs:border-indigo-500 sm:text-sm rounded-md bg-red-100";

export const buttonClassName =
  "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4";

// export const selectClassName = "mt-1 block w-full py-2 px-3 border-gray-300 bg-white orunded-md shadow-sm focus:outline-none focus:ring-indigo-500 foucs:border-indigo-500 sm:text-sm";

