import { WeatherSingle } from "./../../models/weather-single";
import { BASE_URL, WEATHER_ENDPOINT } from "./../constants/api-endpoints";
import { CurrentWeatherRequest } from "../../models/request/current-weather-request";
import { Api } from "../api/api";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs/Observable";

@Injectable()
export class WeatherServiceProvider {
    _api: Api;

    constructor(public api: Api) {
        this._api = api;
    }

    public getCurrentWeather(request: CurrentWeatherRequest) {
        let url = BASE_URL + "/" + WEATHER_ENDPOINT;
        return this._api.get<WeatherSingle>(url, request);
    }
}
