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
          <button class="more-info" data-car-id=${carIteam.id}>More info</button>
          <button class="delete-button" data-car-id="${carIteam.id}">Delete</button>
          <button class="update-button">Update</button>
        </div>
        <div class="more-info-box hidden" id="info-box-${carIteam.id}">
          <p><strong>Model:</strong> ${carIteam.model}</p>
          <p><strong>Właściciel:</strong> ${carIteam.owner}</p>
          <p><strong>Data rozpoczęcia:</strong> ${carIteam.start_date}</p>
          <p><strong>Data zakończenia:</strong> ${carIteam.end_date}</p>
          <p><a href="${carIteam.payment}" target="_blank">Pokaż fakturę</a></p>
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
  
  document.querySelectorAll('.more-info').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.stopPropagation();
      const carId = link.dataset.carId;
      const infoBox = document.getElementById(`info-box-${carId}`);
      const isVisible = !infoBox.classList.contains('hidden');

      document.querySelectorAll('.more-info-box').forEach((box) => {
        box.classList.add('hidden');
      });
      document.querySelectorAll('.more-info').forEach((btn) => {
        btn.classList.remove('active');
      });

      if (!isVisible) {
        infoBox.classList.remove('hidden');
        link.classList.add('active');
      } else {
        infoBox.classList.add('hidden');
        link.classList.remove('active');
      }
    });
  });
}
