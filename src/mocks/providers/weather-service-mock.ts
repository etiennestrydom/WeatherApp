import { WeatherSingle } from "../../models/weather-single";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { MainWeather } from "../../models/main-weather";
import { Weather } from "../../models/weather";
import { WeatherRequest } from "../../models/request/weather-request";

export class WeatherServiceMock {
    public getCurrentWeather(
        request: WeatherRequest
    ): Observable<WeatherSingle> {
        let response = new WeatherSingle();
        response.main = new MainWeather();
        response.main.temp = "20";
        response.main.temp_max = "50";
        response.main.temp_min = "10";
        response.weather = [new Weather()];
        response.weather[0].main = "clouds";

        return Observable.of(response);
    }
}
