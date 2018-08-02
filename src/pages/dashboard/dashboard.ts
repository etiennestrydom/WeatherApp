import { WeatherRequest } from "./../../models/request/weather-request";
import { APPID } from "./../../constants/storage-keys";
import { WeatherForecastResponse } from "./../../models/response/weather-forecast-response";
import { LoaderProvider } from "../../providers/loader/loader";
import { WeatherSingle } from "../../models/weather-single";
import { WeatherServiceProvider } from "../../providers/weather-service/weather-service";
import { Component } from "@angular/core";
import { IonicPage, Refresher } from "ionic-angular";
import { Settings } from "../../providers";
import "rxjs/add/operator/do";
import "rxjs/add/operator/finally";
import { Geolocation } from "@ionic-native/geolocation";
import { Observable } from "../../../node_modules/rxjs/Observable";

@IonicPage()
@Component({
    selector: "page-dashboard",
    templateUrl: "dashboard.html"
})
export class DashboardPage {
    private _weatherServiceProvider: WeatherServiceProvider;
    private _loaderProvider: LoaderProvider;
    private _settings: Settings;
    private _geolocation: Geolocation;

    public weatherSingle: WeatherSingle;
    public weatherForecastResponse: WeatherForecastResponse;

    constructor(
        private weatherServiceProvider: WeatherServiceProvider,
        private loaderProvider: LoaderProvider,
        private settings: Settings,
        private geolocation: Geolocation
    ) {
        this._weatherServiceProvider = weatherServiceProvider;
        this._loaderProvider = loaderProvider;
        this._settings = settings;
        this._geolocation = geolocation;
    }

    ionViewDidLoad() {
        this.loadWeather(null);
    }

    private loadWeather(refresher: Refresher) {
        let weatherRequest: WeatherRequest;
        let showLoader = !refresher ? true : false;

        this._loaderProvider
            .presentLoader(showLoader)
            .then(resp => {
                return this._geolocation.getCurrentPosition();
            })
            .then(location => {
                weatherRequest = new WeatherRequest(location.coords.latitude.toString(), location.coords.longitude.toString());

                return this._settings.getValue(APPID);
            })
            .then(appid => {
                weatherRequest.appid = appid;
                this.getWeatherForCurrentLocation(weatherRequest);
                this.get5DayWeatherForecastForCurrentLocation(weatherRequest);

                if (refresher) refresher.complete();

                return this._loaderProvider.dismissLoader(showLoader);
            })
            .catch(error => {
                console.log("Error getting location", error);
            });
    }

    private getWeatherForCurrentLocation(weatherRequest: WeatherRequest) {
        this._weatherServiceProvider
            .getCurrentWeather(weatherRequest)
            .do(() => {})
            .finally(() => {})
            .subscribe(
                (weatherSingle: WeatherSingle) => {
                    this.weatherSingle = weatherSingle;
                    console.log(this.weatherSingle);
                },
                error => {
                    console.log("This is an error: " + error.message);
                }
            );
    }

    private get5DayWeatherForecastForCurrentLocation(weatherRequest: WeatherRequest) {
        this._weatherServiceProvider
            .getWeatherForecast(weatherRequest)
            .do(() => {})
            .finally(() => {})
            .subscribe(
                (weatherForecastResponse: WeatherForecastResponse) => {
                    this.weatherForecastResponse = weatherForecastResponse;
                    console.log(this.weatherForecastResponse.list);
                    console.log(this.weatherForecastResponse.forecast);
                },
                error => {
                    console.log("This is an error: " + error.message);
                }
            );
    }
}
