/* eslint-disable no-unused-vars */
import { IProfiles } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IStore {
  originData: IProfiles[];
  data: IProfiles[];
  filters: { [key: string]: { [key: string]: boolean } };
}
export type Actions = {
  setData: (data: IProfiles[]) => void;
  setFilters: (filter: { [key: string]: { [key: string]: boolean } }) => void;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  originData: [],
  data: [],
  filters: {
    province: {},
    city: {},
    district: {},
  },
};

export const useData = create<Store>()(
  devtools((set, get) => ({
    ...defaultInitState,
    setData: (data) => {
      let filterData = data.filter((el) => {
        if (get().filters.province[el.province]) {
          if (get().filters.city[el.city]) {
            return el;
          }
        }
      });
      if (
        Object.values(get().filters.province).every((value) => value === false)
      ) {
        filterData = data;
      }
      set({ data: filterData, originData: data });
    },
    setFilters: (filter) => {
      let filterData = get().originData.filter((el) => {
        if (
          filter.province[el.province] ||
          Object.values(filter.province).length == 0
        ) {
          if (filter.city[el.city] || Object.values(filter.city).length == 0) {
            return el;
          }
        }
      });
      if (Object.values(filter.province).every((value) => value === false)) {
        filterData = get().originData;
        console.log(filter, filterData);
      }
      set({ data: filterData, filters: filter });
    },
  })),
);
