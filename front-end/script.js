import { cars, removeFromCar } from "./data/cars.js";

renderCarDetails();

function renderCarDetails(){
  let renderCarHTML = '';

  cars.forEach((carIteam) =>{
    renderCarHTML += `
      <div class="car-details js-car-details" data-car-id="${carIteam.id}">
        <p class="car-info">${carIteam.make} <span class="plate-number">${carIteam.plate_number}</span></p>
        <p class="note">${carIteam.note}</p>
        <div class="buttons-container">
          <button class="more-info">More info</button>
          <button class="delete-button" data-car-id="${carIteam.id}">Delete</button>
          <button class="update-button">Update</button>
        </div>
      </div>
    `; 
  });

  document.querySelector('.cars-container').innerHTML = renderCarHTML;
  
  addEventListeners();
};

function addEventListeners() {
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      
      const carId = button.dataset.carId;      
      removeFromCar(carId);
      renderCarDetails();
    });
  });
  
  document.querySelectorAll('.js-car-details').forEach((link) => {
    link.addEventListener('click', () => {
      const carId = link.dataset.carId;
      console.log('Car details clicked, ID:', carId);
      // Add any other functionality for clicking on the car details here
    });
  });
}
