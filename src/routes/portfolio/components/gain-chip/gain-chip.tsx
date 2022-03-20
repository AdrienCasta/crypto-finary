import { h } from "preact";
import { toEuro } from "../../../../utils/format";

import style from "./gain-chip.style.css";

const operator = (num: number) => (num >= 0 ? "+" : "");

const formatFinancialGain = (gain: number) => {
  return `${operator(gain)}${toEuro(gain)}`;
};

const formatPercentageGain = (gain: number) => {
  return `${operator(gain)}${gain.toFixed(2)} %`;
};

interface Props {
  gain: number;
  as?: "%" | "€";
}

const GainChip = ({ gain, as = "€" }: Props) => {
  const formatGain = as === "€" ? formatFinancialGain : formatPercentageGain;
  return (
    <span
      class={
        gain >= 0 ? style.coin_chip_gain_positif : style.coin_chip_gain_negatif
      }
    >
      {formatGain(gain)}
    </span>
  );
};

export default GainChip;
