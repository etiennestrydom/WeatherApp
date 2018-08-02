import { WeatherSingle } from "./../../models/weather-single";
import { WeatherRequest } from "./../../models/request/weather-request";
import { APPID } from "./../../constants/storage-keys";
import { WeatherForecastResponse } from "./../../models/response/weather-forecast-response";
import { LoaderProvider } from "../../providers/loader/loader";
import { WeatherServiceProvider } from "../../providers/weather-service/weather-service";
import { Component } from "@angular/core";
import { IonicPage, Refresher } from "ionic-angular";
import { Settings } from "../../providers";
import "rxjs/add/operator/do";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/toPromise";
import { Geolocation } from "@ionic-native/geolocation";

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
    public isBusy: boolean;

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
                this.isBusy = true;
                return this._geolocation.getCurrentPosition();
            })
            .then(location => {
                weatherRequest = new WeatherRequest(location.coords.latitude.toString(), location.coords.longitude.toString());
                return this._settings.getValue(APPID);
            })
            .then(appid => {
                weatherRequest.appid = appid;
                return this.getWeatherForCurrentLocation(weatherRequest);
            })
            .then((weatherSingle: WeatherSingle) => {
                this.weatherSingle = weatherSingle;
                return this.get5DayWeatherForecastForCurrentLocation(weatherRequest);
            })
            .then(weatherForecastResponse => {
                this.weatherForecastResponse = weatherForecastResponse;
            })
            .catch(error => {
                console.log("Error getting location", error);
            })
            .then(() => {
                this.isBusy = false;

                if (refresher) {
                    refresher.complete();
                }

                return this._loaderProvider.dismissLoader(showLoader);
            });
    }

    private getWeatherForCurrentLocation(weatherRequest: WeatherRequest): Promise<WeatherSingle> {
        return this._weatherServiceProvider.getCurrentWeather(weatherRequest).toPromise();
    }

    private get5DayWeatherForecastForCurrentLocation(weatherRequest: WeatherRequest): Promise<WeatherForecastResponse> {
        return this._weatherServiceProvider.getWeatherForecast(weatherRequest).toPromise();
    }
}
