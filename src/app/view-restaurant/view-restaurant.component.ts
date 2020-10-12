import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Restaurant_client } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent implements OnInit {

  constructor(private location: Location, private restaurantService: RestaurantService) { }
  restaurant: Restaurant_client;
  ngOnInit(): void {
    const routeState: any = this.location.getState();
    this.restaurant = this.restaurantService.getRestaurantById(routeState.id);
  }


}
