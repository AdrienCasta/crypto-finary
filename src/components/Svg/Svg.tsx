import { FunctionalComponent, h } from "preact";

interface SvgProps {
  fill?: string;
}
type SvgFunctionnalComponent = FunctionalComponent<SvgProps>;

const SvgFinaryLogo = (
  <svg viewBox="0 0 48 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 0.142883C7.16344 0.142883 0 7.30632 0 16.1429H32C40.8366 16.1429 48 8.97944 48 0.142883H16ZM16 20.1429C7.16344 20.1429 0 27.3063 0 36.1429H14.8572C23.6937 36.1429 30.8571 28.9794 30.8571 20.1429H16Z"
      fill="var(--secondary)"
    />
  </svg>
);

const SvgPlus = (
  <svg viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.8125 4.875H6.875V0.9375C6.875 0.71875 6.65625 0.5 6.4375 0.5H5.5625C5.31641 0.5 5.125 0.71875 5.125 0.9375V4.875H1.1875C0.941406 4.875 0.75 5.09375 0.75 5.3125V6.1875C0.75 6.43359 0.941406 6.625 1.1875 6.625H5.125V10.5625C5.125 10.8086 5.31641 11 5.5625 11H6.4375C6.65625 11 6.875 10.8086 6.875 10.5625V6.625H10.8125C11.0312 6.625 11.25 6.43359 11.25 6.1875V5.3125C11.25 5.09375 11.0312 4.875 10.8125 4.875Z"
      fill="var(--secondary)"
    />
  </svg>
);

const SvgArrow: SvgFunctionnalComponent = ({ fill = "var(--primary)" }) => (
  <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.03125 8.60547L5.57812 8.05859C5.6875 7.92188 5.6875 7.73047 5.55078 7.59375L3.36328 5.46094H12.7969C12.9609 5.46094 13.125 5.32422 13.125 5.13281V4.36719C13.125 4.20312 12.9609 4.03906 12.7969 4.03906H3.36328L5.55078 1.93359C5.6875 1.79688 5.6875 1.60547 5.57812 1.46875L5.03125 0.921875C4.89453 0.8125 4.70312 0.8125 4.56641 0.921875L0.957031 4.53125C0.847656 4.66797 0.847656 4.85938 0.957031 4.99609L4.56641 8.60547C4.70312 8.71484 4.89453 8.71484 5.03125 8.60547Z"
      fill={fill}
    />
  </svg>
);

const SvgCross: SvgFunctionnalComponent = ({ fill = "var(--primary)" }) => (
  <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.28516 4.75L9.23828 1.82422C9.40234 1.66016 9.40234 1.35938 9.23828 1.19531L8.55469 0.511719C8.39062 0.347656 8.08984 0.347656 7.92578 0.511719L5 3.46484L2.04688 0.511719C1.88281 0.347656 1.58203 0.347656 1.41797 0.511719L0.734375 1.19531C0.570312 1.35938 0.570312 1.66016 0.734375 1.82422L3.6875 4.75L0.734375 7.70312C0.570312 7.86719 0.570312 8.16797 0.734375 8.33203L1.41797 9.01562C1.58203 9.17969 1.88281 9.17969 2.04688 9.01562L5 6.0625L7.92578 9.01562C8.08984 9.17969 8.39062 9.17969 8.55469 9.01562L9.23828 8.33203C9.40234 8.16797 9.40234 7.86719 9.23828 7.70312L6.28516 4.75Z"
      fill={fill}
    />
  </svg>
);

const prepareSvgComponent: (Svg: h.JSX.Element) => FunctionalComponent<{
  width?: number;
  height?: number;
}> = (Svg) => {
  return ({ width, height }) => {
    if (width || height) {
      return <div style={{ width, height }}>{Svg}</div>;
    }
    return Svg;
  };
};

const prepareSvgComponent2: (
  Svg: SvgFunctionnalComponent
) => FunctionalComponent<{
  width?: number;
  height?: number;
  fill?: string;
}> = (Svg) => {
  return ({ width, height, fill }) => {
    if (width || height) {
      return (
        <div style={{ width, height }}>
          <Svg fill={fill} />
        </div>
      );
    }
    return <Svg fill={fill} />;
  };
};

const FinaryLogo = prepareSvgComponent(SvgFinaryLogo);
const Plus = prepareSvgComponent(SvgPlus);
const Arrow = prepareSvgComponent2(SvgArrow);
const Cross = prepareSvgComponent2(SvgCross);

export { FinaryLogo, Plus, Arrow, Cross };
