import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from 'app/utils/globalVars'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    registerUser(username: string, password: string) {
        return this.http.post(`${API_URL}/auth/register`, {
            username: username,
            password: password
        })
    }

    signInUser(username: string, password: string) {
        return this.http.post(`${API_URL}/auth/login`, {
            username: username,
            password: password
        })
    }
}