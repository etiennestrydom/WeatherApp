import { WeatherSingle } from "../weather-single";

export class WeatherForecastResponse {
    list: Array<WeatherSingle>;
    forecast: Array<WeatherSingle>;
}
