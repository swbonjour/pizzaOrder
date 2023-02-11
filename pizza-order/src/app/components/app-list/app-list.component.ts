import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/services/order.service';

interface IOrder {
  name: string
  size: string
  dough: string
  sideboard: string
  topping: string
  destination: string
  additional: string
  status: string
  id: string
  profileName: string
  profileImg: string
  profileID: string
}

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {
  
  orders: IOrder[] = []

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
      this.orderService.getAllOrders().subscribe(payload => {
        //@ts-ignore
        this.orders = payload.payload
        console.log(this.orders)
      })
  }
}
