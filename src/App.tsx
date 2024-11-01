import { useState } from "react";
import "./App.scss";
import { HaulForm, HaulFormType } from "./components/haulForm/haulForm";
import { HaulsList } from "./components/hauls/haulsList";
import { Total } from "./components/total/total";
import { Bar } from "./components/bar/bar";
import { v1 } from "uuid";

type TruckListType = {
  id: string;
  title: string;
  removeTruckList: (id: string) => void;
};

const truckListId1 = v1();
const truckListId2 = v1();

function App() {
  const [truckLists, setTruckLists] = useState<Array<TruckListType>>([
    { id: truckListId1, title: "k370mm53", removeTruckList },
    { id: truckListId2, title: "k777mm53", removeTruckList },
  ]);

  const [haulsObj, setHauls] = useState({
    [truckListId1]: [
      {
        id: v1(),
        date: "21.01.2023",
        direction: "Volgograd - SPb",
        cost: 180000,
        kilometers: 2000,
        l100: 32,
        literCost: 63,
        emptyKm: 50,
      },
      {
        id: v1(),
        date: "21.01.2023",
        direction: "SPb - Msk",
        cost: 50000,
        kilometers: 750,
        l100: 32,
        literCost: 63,
        emptyKm: 50,
      },
    ],
    [truckListId2]: [
      {
        id: v1(),
        date: "21.01.2023",
        direction: "Volgograd - SPb",
        cost: 180000,
        kilometers: 2000,
        l100: 32,
        literCost: 63,
        emptyKm: 50,
      },
    ],
  });

  function removeTruckList(truckListId: string) {
    const filteredList = truckLists.filter((l) => l.id !== truckListId);
    setTruckLists(filteredList);
    delete haulsObj[truckListId];
    setHauls({ ...haulsObj });
  }

  function removeHaul(id: string, truckListId: string) {
    const prevHauls = haulsObj[truckListId];
    const filteredHauls = prevHauls.filter((l) => l.id !== id);
    setHauls({ ...haulsObj, [truckListId]: filteredHauls });
  }

  function addHaul(props: HaulFormType, truckListId: string) {
    const newHaul = {
      id: v1(),
      date: props.date,
      direction: props.direction,
      cost: props.cost,
      kilometers: props.kilometers,
      l100: props.l100,
      literCost: props.literCost,
      emptyKm: props.emptyKm,
    };
    const prevHauls = haulsObj[truckListId];
    const newHauls = [...prevHauls, newHaul];
    setHauls({ ...haulsObj, [truckListId]: newHauls });
  }

  return (
    <>
      {truckLists.map((tl) => {
        const haulsForTruck = haulsObj[tl.id];
        const onClickHandler = () => tl.removeTruckList(tl.id);
        return (
          <>
            <div className="truckTitle">
              {tl.title}
              <button onClick={onClickHandler}>x</button>
            </div>

            <div key={tl.id} className="form-and-list">
              <HaulForm addHaul={addHaul} truckListId={tl.id} />
              <div className="hauls-list">
                <Bar />
                <HaulsList
                  id={tl.id}
                  hauls={haulsForTruck}
                  removeList={removeHaul}
                />
                <Total />
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default App;
