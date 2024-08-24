import type { Dispatch } from "react";
import { create } from "zustand";

type HeaderStateType = {
  visible: boolean;
  setVisible: Dispatch<boolean>;
};

const useHeaderState = create<HeaderStateType>((set) => ({
  visible: true,
  setVisible: (visible) => set({ visible }),
}));

export default useHeaderState;
