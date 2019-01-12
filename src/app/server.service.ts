import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/RX';
import { Observable } from 'rxjs/RX';

@Injectable()
export class ServerService {

    constructor(private http: Http) {}

    storeServers(servers: any[]) {
        const headers = new Headers({'Content-Type': 'application/json'});
        // return this.http.post('https://udemy-ng-http-6827f.firebaseio.com/data.json', servers, {headers: headers});
        return this.http.put('https://udemy-ng-http-6827f.firebaseio.com/data.json', servers, {headers: headers});
    }

    getServers() {
        return this.http.get('https://udemy-ng-http-6827f.firebaseio.com/data')
        .map(
            (response: Response) => {
                const data = response.json();
                for (const server of data) {
                    server.name = 'Fetched_' + server.name;
                }
                return data;
            }
        )
        .catch(
            (error: Response) => {
                console.log('something went wrong');
                return Observable.throw(error);
            }
        );
    }

    getAppName() {
        return this.http.get('https://udemy-ng-http-6827f.firebaseio.com/data/appName.json')
        .map(
            (response: Response) => {
                return response.json();
            }
        );
    }
}
