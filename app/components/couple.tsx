import { wedding } from "../wedding";

/** The couple's full names, stacked so they fit on narrow screens. */
export function Couple() {
  return (
    <>
      <span className="block">{wedding.partnerOne}</span>
      <span className="block font-serif text-[0.62em] italic leading-tight">&amp;</span>
      <span className="block">{wedding.partnerTwo}</span>
    </>
  );
}
