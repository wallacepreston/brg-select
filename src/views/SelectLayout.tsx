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

const PharmacyElem = styled.div<{selected?: boolean}>`
  background-color: ${(props) => (props.selected ? 'lightgrey' : 'white')};
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

  return <MainContainer>
    <Column>
      <div>available</div>
      <Card>
        {
          available.map(pharmacy => <PharmacyElem selected={pharmacy.id === toSelect} key={pharmacy.id} onClick={() => setToSelect(pharmacy.id)}>{pharmacy.name}</PharmacyElem>)
        }
      </Card>
    </Column>
    <ButtonColumn>
      <button onClick={() => handleSelect(toSelect)}>{'>>'}</button>
      <button onClick={() => handleRemove(toSelect)}>{'<<'}</button>
    </ButtonColumn>
    <Column>
      <div>selected</div>
      <Card>
        {
          selected.map(pharmacy => <PharmacyElem selected={pharmacy.id === toSelect} key={pharmacy.id} onClick={() => setToSelect(pharmacy.id)}>{pharmacy.name}</PharmacyElem>)
        }
      </Card>
    </Column>
  </MainContainer>
}