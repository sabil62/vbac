import tw, { styled } from "twin.macro";

//fads
export const Label = styled.label(({ inline, inlineThree, error }) => [
  tw`block text-sm font-medium text-gray-700`,
  inline &&
    tw`inline-block pl-[0.5rem] sm:pl-[1rem] text-sm md:text-base font-normal`,
  inlineThree && tw`inline-block md:text-base text-sm font-normal p-0`,
  error && tw`text-red-700`,
]);

export const Grid = styled.div(({ grid12 }) => [
  tw`md:grid md:grid-cols-6 lg:grid-cols-10 md:gap-6`,
  grid12 && tw`md:grid-cols-10 lg:grid-cols-12`,
]);

export const GridOffset = styled.div(({ three }) => [
  tw`md:col-span-1 lg:col-span-2`,
  three && tw`md:col-span-2 lg:col-span-3`,
]);

// export const GridOffset = tw.div`md:col-span-1 lg:col-span-2`;

export const GridContent = styled.div(({ grid12, grid8 }) => [
  tw`md:col-span-4 lg:col-span-6 mt-5 sm:mt-6 lg:mx-[6%]`,
  grid12 && tw`md:col-span-10 lg:col-span-8`,
  grid8 && tw`lg:col-span-6`,
]);

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
  "mt-1 px-2 py-[0.2rem] focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm sm:py-[0.5rem] border-2 border-gray-300 rounded-md";

export const inputClassNameError =
  "mt-1 px-2 py-[0.2rem] focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:(text-sm py-[0.5rem]) border-2 border-red-400 rounded-md bg-red-100";

export const selectClassName =
  "mt-1 block w-full py-2 px-3 border-gray-300 bg-white orunded-md shadow-sm focus:outline-none focus:ring-indigo-500 foucs:border-indigo-500 sm:text-sm rounded-md";

export const selectClassNameError =
  "mt-1 block w-full py-2 px-3 border-2 border-red-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 foucs:border-indigo-500 sm:text-sm rounded-md bg-red-100";

export const buttonClassName =
  "inline-flex justify-center py-2 text-center box-border w-[5rem] lg:w-[6rem] xl:w-[7.2rem] border border-[rgba(200,200,200,0.1)] shadow-sm text-[0.92rem] lg:text-[1.1rem] xl:text-lg font-extrabold rounded-md text-white bg-[color:var(--main-button-color)] hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2 lg:ml-4 outline-none";

// export const selectClassName = "mt-1 block w-full py-2 px-3 border-gray-300 bg-white orunded-md shadow-sm focus:outline-none bg-[#FFBCF2] focus:ring-indigo-500 foucs:border-indigo-500 sm:text-sm";

export const MainText = tw.div`text-3xl lg:text-6xl md:text-5xl font-bold tracking-[0.6px] text-center pb-2`;
export const SmallText = tw.div`text-[0.7rem] md:text-[0.86rem] lg:text-[0.92rem] font-thin w-5/6 text-center my-3`;

export const GridMain = tw.div`grid w-5/6 grid-cols-6 gap-4 mt-6 content-center box-border`;
export const GridInside = tw.div`col-span-6 md:col-span-3 flex justify-center items-center flex-col sm:block`;

export const PinkBox = styled.div(({ low }) => [
  tw`mb-7 w-[16rem] sm:w-11/12 rounded-2xl lg:rounded-3xl cursor-pointer h-[6rem] md:h-[7rem] lg:h-[8rem] flex flex-col justify-center items-center leading-7 md:leading-8 lg:leading-9 hover:bg-pink-300`,
  `background-color:#fc34c0`,
  low && `background-color:#ffbcf2`,
  // low && tw`rounded-sm`,
]);

export const WhiteText = styled.div(({ bold }) => [
  tw`text-white font-light text-[1.2rem] md:text-[1.65rem] lg:text-[2rem]`,
  bold && tw`font-bold`,
]);

export const Title = styled.div(({ hotpink }) => [
  tw`py-1 px-3 md:px-5 font-bold text-[1.4rem] md:text-[1.8rem] text-[color:var(--main-button-color)] flex justify-between items-center`,
  hotpink && tw`text-[color:var(--landing-page-main-button)]`,
]);

export const BottomFormFlex = tw.div`bg-gray-50 px-4 py-3 flex justify-between items-center`;

export const toolTipColorStyle = {
  "--tooltip-color": "rgb(50,60,70)",
  "--tooltip-down-color": "rgb(50,60,70)",
};

export const Subtitle = tw.div`font-medium text-justify text-[0.7rem] md:text-[0.79rem] tracking-[0.01rem] pt-1 pb-3 px-3 md:px-5 text-[rgb(100,100,100)]`;

export const clickhere = "text-pink-600 hover:text-pink-500 font-semibold ";

export const clickhere2 = "text-pink-300 hover:text-pink-400 font-semibold ";
