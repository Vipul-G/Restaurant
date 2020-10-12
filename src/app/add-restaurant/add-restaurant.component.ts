import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { mimeType } from './mime-type.validators';
import { Location } from '@angular/common';
import { Restaurant_client, Restaurant_server } from '../restaurant';
@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService, private location: Location
    ) { }

  states = ['Delhi', 'Hariyana', 'Maharastra'];
  imagePreview = '';
  mode = 'add';
  private routeState: {mode: string, id?: string} | any;
  public restaurantForm = this.fb.group({
    _id: [''],
    name: [''],
    image: ['', { asyncValidators: [mimeType] }],
    address: this.fb.group({
      city: [''],
      state: ['']
    })
  });

  onSubmit(): void {
    if (this.mode === 'add') {
      this.restaurantService.addRestaurant(this.restaurantForm.value);
      return;
    }
    this.restaurantService.updateById(this.routeState.id, this.restaurantForm.value);

  }

  onImagePick(event: Event): void {
    const pic = (event.target as HTMLInputElement).files[0];
    this.restaurantForm.patchValue({
      image: pic
    });
    this.restaurantForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(pic);
  }

  ngOnInit(): void {
    console.log('addrestaurant loaded');
    this.routeState = this.location.getState();
    this.mode = this.routeState.mode;
    console.log('RouteState:', this.routeState);
    if (this.routeState.mode === 'edit' && this.routeState.id) {
      const restaurant = this.restaurantService.getRestaurantById(this.routeState.id);
      this.imagePreview = restaurant.image as string;
      this.restaurantForm.setValue({
        _id: restaurant._id,
        name: restaurant.name,
        address: restaurant.address,
        image: ''
      });
    }
  }

}
