import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`

const Card = styled.div`
  border: 1px solid black;
  border-radius: 16px;
  padding: 16px;
`

const ButtonColumn = styled.div`
  display:flex;
  flex-direction: column;
`

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
  
  const selected = pharmacies.filter(pharmacy => !!pharmacy.selected);
  const available = pharmacies.filter(pharmacy => !pharmacy.selected);
  
  useEffect(() => {
    getPharmacies().then((pharms) => setPharmacies(pharms))
  }, [])

  const handleSelect = (id: number) => {
    const newPharmacies = pharmacies.map((pharmacy) => {
        return pharmacy.id === id ? {
          ...pharmacy,
          selected: true
        } : pharmacy
      }
    )
    setPharmacies(newPharmacies);
  }

  const handleRemove = (id: number) => {
    const newPharmacies = pharmacies.map((pharmacy) => {
        return pharmacy.id === id ? {
          ...pharmacy,
          selected: false
        } : pharmacy
      }
    )
    setPharmacies(newPharmacies);
  }

  return <MainContainer>
    <Column>
      <div>available</div>
      <Card>
        {
          available.map(pharmacy => <div key={pharmacy.id} onClick={() => handleSelect(pharmacy.id)}>{pharmacy.name}</div>)
        }
      </Card>
    </Column>
    <ButtonColumn>
      <button>{'>>'}</button>
      <button>{'<<'}</button>
    </ButtonColumn>
    <Column>
      <div>selected</div>
      <Card>
        {
          selected.map(pharmacy => <div key={pharmacy.id} onClick={() => handleRemove(pharmacy.id)}>{pharmacy.name}</div>)
        }
      </Card>
    </Column>
  </MainContainer>
}