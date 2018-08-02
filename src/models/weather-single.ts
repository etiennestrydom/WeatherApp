import { MainWeather } from "./main-weather";
import { Weather } from "./weather";

export class WeatherSingle {
    dt: number;
    weather: Array<Weather>;
    main: MainWeather;
    friendlyName: string;
    date: Date;
    dayOfWeek: string;
}
