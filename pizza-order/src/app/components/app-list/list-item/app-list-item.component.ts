import { Component, Input } from '@angular/core';
import { OrderService } from 'app/services/order.service';
import { API_URL } from 'app/utils/globalVars';
import axios from 'axios';

@Component({
  selector: 'app-list-item',
  templateUrl: './app-list-item.component.html',
  styleUrls: ['./app-list-item.component.scss']
})
export class AppListItemComponent {
  isChangingStatus = false;

  @Input() pizzaName: string;
  @Input() size: string;
  @Input() dough: string;
  @Input() sideboard: string;
  @Input() toppings: string;
  @Input() destination: string;
  @Input() additional: string;
  @Input() status: string;
  @Input() orderID: string;

  @Input() ordererName: string;
  @Input() ordererImage: string;
  @Input() ordererID: string;

  constructor(private orderService: OrderService) {}
  
  selectStatus() {
    this.isChangingStatus = !this.isChangingStatus;
  }

  updateOrderStatus(status: string) {
    this.orderService.updateOrderStatus(this.orderID, status).subscribe(async payload => {
      this.isChangingStatus = !this.isChangingStatus
      //@ts-ignore
      this.status = payload.payload.status
      await axios.post(`${API_URL}/orders/notify`, {
        text: `Status of your order is: ${this.status} <@${this.ordererID}>`
      })
    })
  }
}
