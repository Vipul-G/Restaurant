
export interface Restaurant_client {
    _id: string;
    name: string;
    image?: File | string;
    address: {
        state: string;
        city: string;
    };
}

export interface Restaurant_server {
  _id: string;
  name: string;
  imagePath?: string;
  address: {
      state: string;
      city: string;
  };
}
