import { cars } from "./data/cars.js";

renderCarDetails()

function renderCarDetails(){
  let renderCarHTML = ''

  cars.forEach((carIteam) =>{
    renderCarHTML += `
      <div class="car-details js-car-details-${carIteam.id}">
        <p class="car-info">${carIteam.make} <span class="plate-number">${carIteam.plate_number}</span></p>
        <p class="note">${carIteam.note}</p>
        <div class="buttons-container">
          <button class="more-info">More info</button>
          <button class="delete-button">Delete</button>
          <button class="update-button">Update</button>
        </div>
      </div>
    `; 
  });

  document.querySelector('.cars-container').innerHTML = renderCarHTML;
}

