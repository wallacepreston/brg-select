import React, { useEffect, useMemo, useState } from 'react';
import './SelectLayout.css';


interface SelectLayoutProps {}

type Pharmacy = {
  name: string;
  id: number;
  selected?: boolean;
}

const DEFAULT_PHARMACIES = [
  {
    name: 'Walgreens',
    id: 1
  },
  {
    name: 'WalMart',
    id: 2

  },
  {
    name: 'CVS',
    id: 3
  },
]

const getPharmacies = async () => {
  return Promise.resolve(DEFAULT_PHARMACIES);
}

export const SelectLayout: React.FC<SelectLayoutProps> = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [toSelect, setToSelect] = useState<number | null>(null);
  
  const selected = pharmacies.filter(pharmacy => !!pharmacy.selected);
  const available = pharmacies.filter(pharmacy => !pharmacy.selected);
  
  useEffect(() => {
    getPharmacies().then((pharms) => setPharmacies(pharms))
  }, [])

  const handleSelect = (id: number | null) => {
    if (!id) return;
    const newPharmacies = pharmacies.map((pharmacy) => {
        return pharmacy.id === id ? {
          ...pharmacy,
          selected: true
        } : pharmacy
      }
    )
    setPharmacies(newPharmacies);
  }

  const handleRemove = (id: number | null) => {
    if (!id) return;
    const newPharmacies = pharmacies.map((pharmacy) => {
        return pharmacy.id === id ? {
          ...pharmacy,
          selected: false
        } : pharmacy
      }
    )
    setPharmacies(newPharmacies);
  }

  return <div className="main-container">
    <div className="column">
      <div>available</div>
      <div className="card">
        {
          available.map(pharmacy => (
            <div 
              key={pharmacy.id} 
              className={`pharmacy-elem ${pharmacy.id === toSelect ? 'selected' : ''}`}
              onClick={() => setToSelect(pharmacy.id)}
            >
              {pharmacy.name}
            </div>
          ))
        }
      </div>
    </div>
    <div className="button-column">
      <button onClick={() => handleSelect(toSelect)}>{'>>'}</button>
      <button onClick={() => handleRemove(toSelect)}>{'<<'}</button>
    </div>
    <div className="column">
      <div>selected</div>
      <div className="card">
        {
          selected.map(pharmacy => (
            <div 
              key={pharmacy.id} 
              className={`pharmacy-elem ${pharmacy.id === toSelect ? 'selected' : ''}`}
              onClick={() => setToSelect(pharmacy.id)}
            >
              {pharmacy.name}
            </div>
          ))
        }
      </div>
    </div>
  </div>
}