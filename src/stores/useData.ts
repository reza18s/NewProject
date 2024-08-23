/* eslint-disable no-unused-vars */
import { Profile } from "@prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IStore {
  data: Profile[];
  filters: { [key: string]: boolean };
}
export type Actions = {
  setData: (data: Profile[]) => void;
  setFilters: (filter: { [key: string]: boolean }) => void;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  data: [],
  filters: {},
};

export const useData = create<Store>()(
  devtools((set) => ({
    ...defaultInitState,
    setData: (data) => {
      const newObj: { [key: string]: boolean } = {};
      data.map((el) => {
        if (!newObj[el.city]) {
          newObj[el.city] = false;
        }
      });
      set({ data, filters: newObj });
    },
    setFilters: (filter) => {},
  })),
);
