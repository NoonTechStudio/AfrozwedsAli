import { wedding } from "../wedding";

/** The couple's full names, stacked so they fit on narrow screens. */
export function Couple() {
  return (
    <span className="block font-serif font-medium tracking-wide">
      <span className="block">{wedding.partnerOne}</span>
      <span className="block text-[0.62em] font-normal italic leading-tight">&amp;</span>
      <span className="block">{wedding.partnerTwo}</span>
    </span>
  );
}
