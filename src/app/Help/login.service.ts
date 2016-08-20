
import { Injectable } from '@angular/core';
import {  Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class loginService {
    constructor(private http: Http){}
    public unpw: {user: string; pw: string;};

    public login(un: string,pw: string): Observable<any> {

        this.unpw.user = un;
        this.unpw.pw = pw;
        let body = JSON.stringify(this.unpw);

        let uri = 'https://3000/login';
        return this.http.post(uri,body)
            .map((res: Response) => res.json());
    }
}
