import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Restaurant_client } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private restaurantService: RestaurantService) { }
  public restaurants$: Observable<Restaurant_client[]>;

  ngOnInit(): void {
    console.log('Home NgOnit called');
    this.restaurants$ = this.restaurantService.getRestaurants();
    // this.restaurants$.subscribe((restaurants: Restaurant_client[]) => console.log(restaurants));
  }

  deleteRestaurantById(id: string): void {
    this.restaurantService.deleteRestaurantById(id);
  }

}
