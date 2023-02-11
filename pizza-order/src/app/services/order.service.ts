import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from 'app/utils/globalVars'

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) {}

    getAllOrders() {
        return this.http.get(`${API_URL}/orders/list`, {
            headers: {
                //@ts-ignore
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    updateOrderStatus(id: string, status: string) {
        return this.http.put(`${API_URL}/orders/update`, {
            orderID: id,
            status: status
        },
        {
            headers: {
                //@ts-ignore
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}