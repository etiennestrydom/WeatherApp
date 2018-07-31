import {
    BASE_URL,
    WEATHER_ENDPOINT,
    WEATHER_FORECAST_ENDPOINT
} from "../../constants/api-endpoints";
import { WeatherForecastResponse } from "../../models/response/weather-forecast-response";
import { WeatherSingle } from "../../models/weather-single";
import { Api } from "../api/api";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { WeatherRequest } from "../../models/request/weather-request";

@Injectable()
export class WeatherServiceProvider {
    _api: Api;

    constructor(public api: Api) {
        this._api = api;
    }

    public getCurrentWeather(
        request: WeatherRequest
    ): Observable<WeatherSingle> {
        let url = BASE_URL + "/" + WEATHER_ENDPOINT;
        return this._api.get<WeatherSingle>(url, request);
    }

    public getWeatherForecast(
        request: WeatherRequest
    ): Observable<WeatherForecastResponse> {
        let url = BASE_URL + "/" + WEATHER_FORECAST_ENDPOINT;
        return this._api.get<WeatherForecastResponse>(url, request);
    }
}
