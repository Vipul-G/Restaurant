import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Restaurant_client, Restaurant_server } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants$$: BehaviorSubject<Restaurant_client[]> = new BehaviorSubject([]);

  readonly backendURL = 'http://localhost:3000/api/restaurant';

  private restaurants: Restaurant_client[] = [];
  constructor(private http: HttpClient) {
    this.http.get<{restaurants: any[]}>(this.backendURL)
    .subscribe((response) => {
      response.restaurants.forEach((restaurant) => {
        restaurant.image = restaurant.imagePath;
        delete restaurant.imagePath;
      });
      this.restaurants = response.restaurants;
      this.restaurants$$.next(this.restaurants);
      console.log('BehaviorSubject', this.restaurants$$.value);
    });
  }

  addRestaurant(restaurant: any): void {

    const restaurantData = new FormData();
    restaurantData.append('name', restaurant.name);
    restaurantData.append('image', restaurant.image);
    restaurantData.append('address', JSON.stringify(restaurant.address));
    this.http.post<Restaurant_server>(this.backendURL, restaurantData)
    .subscribe((createdRes) => {
      console.log({createdRes});
      const newRes: Restaurant_client = {
        _id: createdRes._id,
        name: createdRes.name,
        image: createdRes.imagePath,
        address: createdRes.address
      };
      this.restaurants.push(newRes);
      this.restaurants$$.next(this.restaurants);
    });

  }

  getRestaurantById(id: string): Restaurant_client{
    return this.restaurants.find((restaurant) => restaurant._id === id);
  }

  getRestaurants(): Observable<Restaurant_client[]> {
    return this.restaurants$$.asObservable();
  }

  deleteRestaurantById(id: string): void {
    this.http.delete<{deletedResto: any}>(`${this.backendURL}/${id}`)
    .subscribe((response) => {
      let restaurants = this.restaurants$$.value;
      restaurants = restaurants.filter((restaurant) => restaurant._id !== id);
      this.restaurants$$.next(restaurants);
    });
  }

  updateById(id: string, restaurant: Restaurant_client): void {
    const restaurantData = new FormData();
    restaurantData.append('name', restaurant.name);
    restaurantData.append('image', restaurant.image);
    restaurantData.append('address', JSON.stringify(restaurant.address));
    const restaurants: any[] = this.restaurants$$.value;
    this.http.put<{updatedResto: any}>(`${this.backendURL}/${id}`, restaurantData)
    .subscribe((response) => {
      const updatedResto = response.updatedResto;
      updatedResto.image = updatedResto.imagePath;
      delete updatedResto.imagePath;
      console.log({updatedResto});
      restaurants.forEach((resto) => {
        if (resto._id === id) {
          console.log('Updating', {resto});
          Object.assign(resto, updatedResto);
          console.log('Updated', {resto});
        }
      });
      console.log({restaurants});
      this.restaurants$$.next(restaurants);
    });
  }

}
