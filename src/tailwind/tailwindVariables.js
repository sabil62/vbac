import tw, { styled } from "twin.macro";

//fads
export const Label = styled.label(({ inline, inlineThree }) => [
  tw`block text-sm font-medium text-gray-700`,
  inline && tw`inline-block pl-[1rem] text-sm md:text-base font-normal`,
  inlineThree && tw`inline-block md:text-base text-sm font-normal p-0`,
]);
export const Grid = styled.div(({ grid8 }) => [
  tw`md:grid md:grid-cols-6 lg:grid-cols-10 md:gap-6`,
  grid8 && tw`grid`,
]);
export const GridOffset = tw.div`md:col-span-1 lg:col-span-2`;
export const GridContent = tw.div`md:col-span-4 lg:col-span-6 mt-5 sm:mt-6`;
export const InnerGrid = tw.div`grid grid-cols-6 gap-6`;
export const InnerSectionGrid = styled.div(({ fullWidth }) => [
  tw`col-span-6 lg:col-span-3 px-6 py-2 md:(p-0 pt-2)`,
  fullWidth && tw`lg:col-span-6`,
]);

export const GridTwo = styled.div(({ three, twelve }) => [
  tw`grid grid-cols-4 p-2 pt-3 gap-2`,
  three && tw`grid-cols-6`,
  twelve && tw`grid-cols-12 `,
]);
export const GridTwoSub = styled.div(({ one, three, four }) => [
  tw`col-span-2`,
  one && tw`col-span-1 lg:pl-6 md:pl-4 pl-2`,
  three && tw`col-span-3`,
  four && tw`col-span-4`,
]);
export const Block = tw.div`block my-1`;
export const FlexDisplay = tw.div`flex justify-between flex-wrap`;
export const WidthBox = styled.div(({ five, six }) => [
  tw`w-[10rem] mt-3`,
  five && tw`w-[5rem]`,
  six && tw`w-[6rem]`,
]);

//classNames
export const inputClassName =
  "mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md";