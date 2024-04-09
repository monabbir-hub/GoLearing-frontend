import { createContext, useContext, useState } from "react";

const ManageCouponContext = createContext();

export default function ManageCouponProvider({ children }) {
  const [appliedCoupon, setAppliedCoupon] = useState("");

  //   console.log("test" + appliedCoupon);
  return (
    <ManageCouponContext.Provider
      value={{
        appliedCoupon,
        setAppliedCoupon,
      }}
    >
      {children}
    </ManageCouponContext.Provider>
  );
}

export function useManageCoupon() {
  const ctx = useContext(ManageCouponContext);
  if (!ctx) throw new Error();
  return ctx;
}
