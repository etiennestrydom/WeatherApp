import { WeatherSingle } from "./../../models/weather-single";
import { BASE_URL, WEATHER_ENDPOINT, WEATHER_FORECAST_ENDPOINT } from "../../constants/api-endpoints";
import { WeatherForecastResponse } from "../../models/response/weather-forecast-response";
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

    public getCurrentWeather(request: WeatherRequest): Observable<WeatherSingle> {
        let url = BASE_URL + "/" + WEATHER_ENDPOINT;
        return this._api.get<WeatherSingle>(url, request).map((weatherSingle: WeatherSingle) => {
            return this.formatWeatherSingle(weatherSingle);
        });
    }

    public getWeatherForecast(request: WeatherRequest): Observable<WeatherForecastResponse> {
        let url = BASE_URL + "/" + WEATHER_FORECAST_ENDPOINT;
        return this._api.get<WeatherForecastResponse>(url, request).map((weatherForecastResponse: WeatherForecastResponse) => {
            weatherForecastResponse.list.forEach(weatherSingle => {
                return this.formatWeatherSingle(weatherSingle);
            });
            weatherForecastResponse.forecast = this.getForecastForNumberOfDays(weatherForecastResponse.list);
            return weatherForecastResponse;
        });
    }

    private formatWeatherSingle(weatherSingle: WeatherSingle): WeatherSingle {
        weatherSingle.friendlyName = this.getFriendlyName(weatherSingle);
        weatherSingle.date = this.getDateFromTimestamp(weatherSingle.dt);
        weatherSingle.dayOfWeek = this.getDayOfWeek(weatherSingle.date.getDay());

        return weatherSingle;
    }

    private getForecastForNumberOfDays(weatherForecastResponseList: Array<WeatherSingle>): Array<WeatherSingle> {
        let forecastList = new Array<WeatherSingle>();
        let startDate = weatherForecastResponseList[0];

        for (let index = 0; index < weatherForecastResponseList.length; index++) {
            if (startDate.date.getDay() != weatherForecastResponseList[index].date.getDay()) {
                forecastList.push(weatherForecastResponseList[index]);
                startDate.date.setDate(startDate.date.getDate() + 1);
                console.log("Startdate: " + startDate.date.getDay());
            }
        }

        return forecastList;
    }

    private getDayOfWeek(day: number): string {
        let weekDays = {
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
            0: "Sunday"
        };

        return weekDays[day];
    }

    private getFriendlyName(weatherSingle: WeatherSingle): string {
        let result;
        switch (weatherSingle.weather[0].main.toLowerCase()) {
            case "clear":
                result = "sunny";
                break;
            case "clouds":
                result = "cloudy";
                break;
            case "rain":
                result = "rainy";
                break;
            default:
                result = "sunny";
        }

        return result;
    }

    private getDateFromTimestamp(timestamp: number): Date {
        return new Date(timestamp * 1000);
    }
}
