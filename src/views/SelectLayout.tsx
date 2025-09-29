import React, { useEffect, useState } from 'react';
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

  return <MainContainer>
    <Column>
      <div>available</div>
      <Card>
        {
          pharmacies.map(pharmacy => <div key={pharmacy.id}>{pharmacy.name}</div>)
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
          pharmacies.map(pharmacy => <div key={pharmacy.id}>{pharmacy.name}</div>)
        }
      </Card>
    </Column>
  </MainContainer>
}