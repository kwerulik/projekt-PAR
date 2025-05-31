export let cars = [
  {
    id: 1,
    plate_number: "KR1234AB",
    make: "Toyota",
    model: "Corolla",
    note: "Wymiana oleju silnikowego i filtra",
    owner: "Jan Kowalski",
    start_date: "2025-03-10",
    end_date: "2025-03-11",
    payment: "faktury/payment1.pdf",
  },
  {
    id: 2,
    plate_number: "WA4567CD",
    make: "Audi",
    model: "A3",
    note: "Naprawa układu hamulcowego",
    owner: "Anna Nowak",
    start_date: "2025-04-02",
    end_date: "2025-04-04",
    payment: "faktury/payment2.pdf",
  },
  {
    id: 3,
    plate_number: "PO8910EF",
    make: "Renault",
    model: "Megane",
    note: "Wymiana sprzęgła",
    owner: "Piotr Zieliński",
    start_date: "2025-02-15",
    end_date: "2025-02-17",
    payment: "faktury/payment3.pdf",
  },
  {
    id: 4,
    plate_number: "GD1122GH",
    make: "Volkswagen",
    model: "Golf IV",
    note: "Diagnostyka silnika, wymiana świec zapłonowych",
    owner: "Magdalena Lewandowska",
    start_date: "2025-05-01",
    end_date: "2025-05-02",
    payment: "faktury/payment4.pdf",
  },
  {
    id: 5,
    plate_number: "LU3344IJ",
    make: "Volkswagen",
    model: "Jetta",
    note: "Wymiana rozrządu i pompy wody",
    owner: "Tomasz Wójcik",
    start_date: "2025-05-20",
    end_date: "2025-05-22",
    payment: "faktury/payment5.pdf",
  },
  {
    id: 6,
    plate_number: "BI5566KL",
    make: "BMW",
    model: "320i",
    note: "Wymiana klocków i tarcz hamulcowych",
    owner: "Katarzyna Bąk",
    start_date: "2025-05-05",
    end_date: "2025-05-06",
    payment: "faktury/payment6.pdf",
  },
  {
    id: 7,
    plate_number: "KT7788MN",
    make: "Opel",
    model: "Astra",
    note: "Naprawa zawieszenia przedniego",
    owner: "Michał Dudek",
    start_date: "2025-05-07",
    end_date: "2025-05-09",
    payment: "faktury/payment7.pdf",
  },
  {
    id: 8,
    plate_number: "RZ9900OP",
    make: "Peugeot",
    model: "308",
    note: "Wymiana chłodnicy i płynu chłodniczego",
    owner: "Agnieszka Maj",
    start_date: "2025-05-10",
    end_date: "2025-05-11",
    payment: "faktury/payment8.pdf",
  },
  {
    id: 9,
    plate_number: "NO2233QR",
    make: "Ford",
    model: "Focus",
    note: "Wymiana akumulatora i alternatora",
    owner: "Rafał Grabowski",
    start_date: "2025-05-12",
    end_date: "2025-05-13",
    payment: "faktury/payment9.pdf",
  },
  {
    id: 10,
    plate_number: "EL4455ST",
    make: "Kia",
    model: "Ceed",
    note: "Regeneracja turbosprężarki",
    owner: "Zofia Król",
    start_date: "2025-05-14",
    end_date: "2025-05-15",
    payment: "faktury/payment10.pdf",
  }
];

export function removeFromCar(carId) {
  let newCars = [];
  carId = Number(carId);
  cars.forEach((car) => {
    if(car.id !== carId){
      newCars.push(car);
    }
  })

  cars = newCars;
}
