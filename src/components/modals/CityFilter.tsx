'use client'; // components/ModalWithCheckboxes.js
import React from 'react';
import styles from './modal.module.css';
import useStore from '@/stores/useStore';
import { useData } from '@/stores/useData';
export default function CityFilter() {
  const store = useStore(useData, (state) => state);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    store?.setFilters({ ...store?.filters, [name]: checked });
  };

  return (
    <>
      <div className={styles.checkboxGroup}>
        {store &&
          Object.keys(store.filters).map((key) => (
            <label key={key}>
              <input
                type="checkbox"
                name={key}
                checked={store.filters[key]}
                onChange={handleCheckboxChange}
              />
              {key}
            </label>
          ))}
      </div>
    </>
  );
}
