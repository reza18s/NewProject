/* eslint-disable no-unused-vars */
import { Profile } from "@prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IStore {
  originData: Profile[];
  data: Profile[];
  filters: { [key: string]: boolean };
}
export type Actions = {
  setData: (data: Profile[]) => void;
  setFilters: (filter: { [key: string]: boolean }) => void;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  originData: [],
  data: [],
  filters: {
    تهران: false,
    ری: false,
    ابعلی: false,
  },
};

export const useData = create<Store>()(
  devtools((set, get) => ({
    ...defaultInitState,
    setData: (data) => {
      let filterData = data.filter((el) => {
        if (get().filters[el.city]) {
          return el;
        }
      });
      if (filterData.length === 0) {
        filterData = data;
      }
      set({ data: filterData, originData: data });
    },
    setFilters: (filter) => {
      let filterData = get().originData.filter((el) => {
        if (filter[el.city]) {
          return el;
        }
      });
      if (filterData.length === 0) {
        filterData = get().originData;
      }
      console.log(filterData);
      set({ data: filterData, filters: filter });
    },
  })),
);
