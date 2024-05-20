export interface PartialHome {
    id: string;
    guests?: string;
    country: string | null;
    bedrooms?: string;
  }

export interface Home {
    id: string;
    title?: string;
    description?: string;
    guests?: string;
    bedrooms?: string;
    bathrooms?: string;
    country?: string;
    photo?: string;
    price?: number;
    categoryName?: string;
    Favorite: Favorite[];
    Reservation: Reservation[];
    addedCategory: boolean;
    addedDescription: boolean;
    addedLocation: boolean;
    createdAT: Date;
    User?: User;
    userId?: string;
  }
  
  interface Favorite {
    id: string;
    User?: User;
    userId?: string;
    Home?: Home;
    homeId?: string;
    createAt: Date;
  }
  
  interface Reservation {
    id: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    User?: User;
    userId?: string;
    Home?: Home;
    homeId?: string;
  }
  
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
    createdAt: Date;
    Home: Home[];
    Favorite: Favorite[];
    Reservation: Reservation[];
  }
  