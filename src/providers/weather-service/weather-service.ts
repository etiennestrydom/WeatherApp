import { BaseUrl, WeatherEndpoint } from "./../constants/api-endpoints";
import { CurrentWeatherRequest } from "../../models/request/current-weather-request";
import { Api } from "../api/api";
import { Injectable } from "@angular/core";

@Injectable()
export class WeatherServiceProvider {
    _api: Api;

    constructor(public api: Api) {
        this._api = api;
    }

    public GetCurrentWeather(request: CurrentWeatherRequest) {
        let url = BaseUrl + "/" + WeatherEndpoint;
        return this._api.get(url, request);
    }
}
