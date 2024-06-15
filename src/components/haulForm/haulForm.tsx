import { SubmitHandler, useForm } from "react-hook-form";
import "./haulForm.scss";

export type HaulFormType = {
  date: string;
  direction: string;
  cost: number;
  kilometers: number;
  l100: number;
  literCost: number;
  emptyKm: number;
};

type PropsTypeHaulForm = {
  addHaul: (data: HaulFormType, truckListId: string) => void;
  truckListId: string;
};

export const HaulForm = (props: PropsTypeHaulForm) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HaulFormType>();

  const onSubmit: SubmitHandler<HaulFormType> = (data: HaulFormType) => {
    props.addHaul(data, props.truckListId);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="haul-form">
        <input type="date" {...register("date", { required: "required" })} />
        {errors?.date && (
          <div style={{ color: "red" }}>{errors.date.message}</div>
        )}
        <input
          type="text"
          className="haul-form__direction"
          maxLength={32}
          {...register("direction", { required: "require" })}
          placeholder="Direction"
        />
        {errors?.direction && (
          <div style={{ color: "red" }}>{errors.direction.message}</div>
        )}
        <input
          type="number"
          maxLength={6}
          {...register("cost", { required: "require" })}
          placeholder="The cost of the haul"
        />
        {errors?.cost && (
          <div style={{ color: "red" }}>{errors.cost.message}</div>
        )}

        <input
          type="number"
          maxLength={5}
          {...register("kilometers", { required: "require" })}
          placeholder="Kilometers"
        />
        {errors?.kilometers && (
          <div style={{ color: "red" }}>{errors.kilometers.message}</div>
        )}

        <input
          type="number"
          maxLength={3}
          {...register("l100", { required: "require" })}
          placeholder="Liter/100km"
        />
        {errors?.l100 && (
          <div style={{ color: "red" }}>{errors.l100.message}</div>
        )}

        <input
          type="number"
          maxLength={3}
          {...register("literCost", { required: "require" })}
          placeholder="The cost of a liter"
        />
        {errors?.literCost && (
          <div style={{ color: "red" }}>{errors.literCost.message}</div>
        )}

        <input
          type="number"
          maxLength={4}
          {...register("emptyKm")}
          placeholder="empty kilometers"
        />
        <button>submit</button>
      </div>
    </form>
  );
};
