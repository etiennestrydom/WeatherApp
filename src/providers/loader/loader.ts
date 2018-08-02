import { LoadingController, Loading } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class LoaderProvider {
    _loadingController: LoadingController;
    _loader: Loading;

    constructor(loadingController: LoadingController) {
        this._loadingController = loadingController;
    }

    public presentLoader(showLoader: boolean = true) {
        this._loader = this._loadingController.create();

        if (showLoader) {
            return this._loader.present();
        } else {
            return Promise.resolve();
        }
    }

    public dismissLoader(showLoader: boolean = true) {
        if (showLoader) {
            return this._loader.dismiss();
        } else {
            return Promise.resolve();
        }
    }
}
