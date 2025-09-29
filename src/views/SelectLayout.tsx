import React, { useEffect, useState } from 'react';
import './SelectLayout.css'

interface SelectLayoutProps {}

type Pharmacy = {
  name: string;
  id: number;
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
  

  useEffect(() => {
    getPharmacies().then((pharms) => setPharmacies(pharms))
  })

  return <div className='main-containter'>
    <div className='column'>
      <div className='card'>
        {
          pharmacies.map(pharmacy => <div key={pharmacy.id}>{pharmacy.name}</div>)
        }
      </div>
    </div>
    <div className='button-column'>
      <button>{'>>'}</button>
      <button>{'<<'}</button>
    </div>
    <div className='column'>
      <div className='card'>
        {
          pharmacies.map(pharmacy => <div key={pharmacy.id}>{pharmacy.name}</div>)
        }
      </div>
    </div>
  </div>
}