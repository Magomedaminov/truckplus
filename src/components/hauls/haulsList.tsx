import "./haulsList.scss";

export type PropsType = {
  id: string;
  hauls: Array<HaulType>;
  removeList: (id: string, truckListId: string) => void;
};

export type HaulType = {
  id: string;
  date: string;
  direction: string;
  cost: number;
  kilometers: number;
  l100: number;
  literCost: number;
  emptyKm: number;
};

export const HaulsList = (props: PropsType) => {
  return props.hauls.map((l) => {
    const onClickHandler = () => props.removeList(l.id, props.id);
    const rubleKm = () => {
      return Math.round(l.cost / l.kilometers);
    };
    const gas = () => {
      return Math.round(l.l100 * (l.kilometers / 100));
    };

    const costOfGas = () => {
      return Math.round(l.l100 * (l.kilometers / 100)) * l.literCost;
    };

    return (
      <div key={l.id} className="haulsList__item">
        <div className="haulsList__item-date">{l.date}</div>
        <div className="haulsList__item-direction">{l.direction}</div>
        <div className="haulsList__item-cost">{l.cost}</div>
        <div className="haulsList__item-8">{l.kilometers}</div>
        <div className="haulsList__item-8">{l.l100}</div>
        <div className="haulsList__item-8">{l.literCost}</div>
        <div className="haulsList__item-8">{l.emptyKm}</div>
        <div className="haulsList__item-8">{rubleKm()}</div>
        <div className="haulsList__item-8">{gas()}</div>
        <div className="haulsList__item-8">{costOfGas()}</div>
        <button onClick={onClickHandler}>X</button>
      </div>
    );
  });
};
