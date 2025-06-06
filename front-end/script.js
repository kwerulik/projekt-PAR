import { cars, removeFromCar, updateCar, addCar } from "./data/cars.js";

renderCarDetails();

function renderCarDetails(){
  let renderCarHTML = '';

  cars.forEach((carItem) =>{
    renderCarHTML += `
      <div class="car-details js-car-details" data-car-id="${carItem.id}">
        <p class="car-info">${carItem.make} <span class="plate-number">${carItem.plate_number}</span></p>
        <p class="note">${carItem.note}</p>
        <div class="buttons-container">
          <button class="more-info" data-car-id=${carItem.id}>More info</button>
          <button class="delete-button" data-car-id="${carItem.id}">Delete</button>
          <button class="update-button" data-car-id=${carItem.id}>Update</button>
        </div>
        <div class="more-info-box hidden" id="info-box-${carItem.id}">
          <p><strong>Model:</strong> ${carItem.model}</p>
          <p><strong>Właściciel:</strong> ${carItem.owner}</p>
          <p><strong>Data rozpoczęcia:</strong> ${carItem.start_date}</p>
          <p><strong>Data zakończenia:</strong> ${carItem.end_date}</p>
          <p><a href="${carItem.payment}" target="_blank">Pokaż fakturę</a></p>
        </div>
        <form class="update-form hidden" id="update-form-${carItem.id}">
          <label>Make: <input name="make" value="${carItem.make}" required/></label><br>
          <label>Model: <input name="model" value="${carItem.model}" required/></label><br>
          <label>Numer rejestracyjny: <input name="plate_number" value="${carItem.plate_number}" required></label><br>
          <label>Właściciel: <input name="owner" value="${carItem.owner}" required></label><br>
          <label>Data rozpoczęcia: <input name="start_date" type="date" value="${carItem.start_date}" required></label><br>
          <label>Data zakończenia: <input name="end_date" type="date" value="${carItem.end_date}" required></label><br>
          <label>Notatka: <input name="note" value="${carItem.note || ''}"></label><br>
          <label>Faktura (link): <input name="payment" value="${carItem.payment || ''}"></label><br>
          <button type="submit" class='js-update-button' data-car-id=${carItem.id}>Zapisz</button>
          <button type="button" class="cancel-update" data-car-id=${carItem.id} >Anuluj</button>
        </form>
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

  document.querySelectorAll('.update-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const carId = button.dataset.carId;
      const updateForm = document.getElementById(`update-form-${carId}`);
      const isVisible = updateForm.classList.contains("hidden");
      
      if (isVisible) {
        updateForm.classList.remove("hidden");
        button.classList.add("active");
      } else {
        updateForm.classList.add('hidden');
        button.classList.remove("active");
      }
    });
    

  });

  document.querySelectorAll(".cancel-update").forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const carId = button.dataset.carId;
      const updateForm = document.getElementById(`update-form-${carId}`);

      updateForm.classList.add('hidden');
    })
  });

  document.querySelectorAll(".js-update-button").forEach( button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const carId = button.dataset.carId;
      const form = document.getElementById(`update-form-${carId}`);
      const formData = new FormData(form);
      const updatedCar = Object.fromEntries(formData.entries());

      updateCar(carId, updatedCar);

      renderCarDetails();  
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const addCarBtn = document.getElementById("add-car-button");
    const addCarModal = document.getElementById("add-car");
    const cancelAddCar = document.getElementById("cancel-add-car");
    const addCarForm = document.getElementById("add-car-form");

    addCarBtn.addEventListener("click", () => {
      addCarModal.classList.remove("hidden");
    });

    cancelAddCar.addEventListener("click", () => {
      addCarModal.classList.add("hidden");
      addCarForm.reset();
    });

    addCarForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(addCarForm);
      const newCar = Object.fromEntries(formData.entries());

      addCar(newCar);
      renderCarDetails();
      addCarModal.classList.add("hidden");
      addCarForm.reset();
    });
  });
}

