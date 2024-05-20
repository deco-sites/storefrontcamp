import { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
  /* @title Nome do local */
  name: string;
  temperature: Temperature | null;
  text?: string;
}

export default function LocalWeather(props: Props) {
  if (!props.temperature) return null;

  return (
    <div class="flex flex-col items-center justify-center my-8">
      <h2 class="text-2xl">Temperatura em {props.name}</h2>
      <strong class="text-6xl">
        {props.temperature.celsius}°C
      </strong>
      {props.text && <small>{props.text}</small>}
    </div>
  );
}

export function Preview() {
  return (
    <LocalWeather
      name="São Paulo"
      temperature={{ celsius: 24 }}
      text="Clima típico: tropical"
    />
  );
}
