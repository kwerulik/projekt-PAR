import {
  cars,
  removeFromCar,
  updateCar,
  addCar,
  getCars,
  uploadFile,
} from "./data/cars.js";
renderCarDetails();

export async function renderCarDetails() {
  const carsList = await getCars();
  let renderCarHTML = "";
  carsList.forEach((carItem) => {
    renderCarHTML += `
      <div class="car-details js-car-details" data-car-id="${carItem.id}">
        <p class="car-info">${carItem.make} <span class="plate-number">${
      carItem.plateNumber
    }</span></p>
        <p class="note">${carItem.note}</p>
        <div class="buttons-container">
          <button class="more-info" data-car-id=${carItem.id}>More info</button>
          <button class="delete-button" data-car-id="${
            carItem.id
          }">Delete</button>
          <button class="update-button" data-car-id=${
            carItem.id
          }>Update</button>
        </div>
        <div class="more-info-box hidden" id="info-box-${carItem.id}">
          <p><strong>Model:</strong> ${carItem.model}</p>
          <p><strong>Właściciel:</strong> ${carItem.owner}</p>
          <p><strong>Data rozpoczęcia:</strong> ${carItem.startDate || ""}</p>
          <p><strong>Data zakończenia:</strong> ${carItem.endDate || ""}</p>
<a href="http://localhost:5180/api/CarRepair/download/${
      carItem.id
    }" target="_blank">Pobierz fakturę</a>
        </div>
        <form class="update-form hidden" id="update-form-${carItem.id}">
          <label>Make: <input name="make" value="${
            carItem.make
          }" required/></label><br>
          <label>Model: <input name="model" value="${
            carItem.model
          }" required/></label><br>
          <label>Numer rejestracyjny: <input name="plateNumber" value="${
            carItem.plateNumber
          }" required></label><br>
          <label>Właściciel: <input name="owner" value="${
            carItem.owner
          }" required></label><br>
          <label>Data rozpoczęcia: <input name="startDate" type="date" value="${
            carItem.startDate || ""
          }" required></label><br>
          <label>Data zakończenia: <input name="endDate" type="date" value="${
            carItem.endDate || ""
          }" required></label><br>
          <label>Notatka: <input name="note" value="${
            carItem.note || ""
          }"></label><br>
          <label>Faktura (plik): <input name="paymentFile" type='file'></label><br>
<br>
          <button type="submit" class='js-update-button' data-car-id=${
            carItem.id
          }>Zapisz</button>
          <button type="button" class="cancel-update" data-car-id=${
            carItem.id
          } >Anuluj</button>
        </form>
      </div>
    `;
  });

  document.querySelector(".cars-container").innerHTML = renderCarHTML;

  addEventListeners();
}

function addEventListeners() {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();

      const carId = button.dataset.carId;
      await removeFromCar(carId).then((result) => {
        if (result?.status === "error") {
          alert(`Błąd usuwania auta: ${result.message}`);
        } else {
          renderCarDetails();
          alert("Auto zostało usunięte");
        }
      });
    });
  });

  document.querySelectorAll(".more-info").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.stopPropagation();
      const carId = link.dataset.carId;
      const infoBox = document.getElementById(`info-box-${carId}`);
      const isVisible = !infoBox.classList.contains("hidden");

      document.querySelectorAll(".more-info-box").forEach((box) => {
        box.classList.add("hidden");
      });
      document.querySelectorAll(".more-info").forEach((btn) => {
        btn.classList.remove("active");
      });

      if (!isVisible) {
        infoBox.classList.remove("hidden");
        link.classList.add("active");
      } else {
        infoBox.classList.add("hidden");
        link.classList.remove("active");
      }
    });
  });

  document.querySelectorAll(".update-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const carId = button.dataset.carId;
      const updateForm = document.getElementById(`update-form-${carId}`);
      const isVisible = updateForm.classList.contains("hidden");

      if (isVisible) {
        updateForm.classList.remove("hidden");
        button.classList.add("active");
      } else {
        updateForm.classList.add("hidden");
        button.classList.remove("active");
      }
    });
  });

  document.querySelectorAll(".cancel-update").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const carId = button.dataset.carId;
      const updateForm = document.getElementById(`update-form-${carId}`);

      updateForm.classList.add("hidden");
    });
  });

  document.querySelectorAll(".js-update-button").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const carId = button.dataset.carId;
      const form = document.getElementById(`update-form-${carId}`);
      const formData = new FormData(form);
      const updatedCar = Object.fromEntries(formData.entries());

      const file = form.querySelector('input[name="paymentFile"]')?.files[0];

      await updateCar(carId, updatedCar).then(async (result) => {
        if (result?.status === "error") {
          alert(`Błąd aktualizacji auta: ${result.message}`);
        } else {
          if (file) {
            const uploadResult = await uploadFile(carId, file);
            if (uploadResult.status === "error") {
              alert(
                `Auto zaktualizowane, ale błąd przesyłania pliku: ${uploadResult.message}`
              );
            } else {
              alert("Auto i plik zostały zaktualizowane");
            }
          } else {
            alert(result.message);
          }
          renderCarDetails();
        }
      });
    });
  });
}

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

addCarForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(addCarForm);
  const newCar = Object.fromEntries(formData.entries());
  delete newCar.PaymentDoc;

  const file = addCarForm.querySelector('input[name="paymentFile"]')?.files[0];

  try {
    const result = await addCar(newCar);

    if (result?.status === "error") {
      alert(`Błąd dodawania auta: ${result.message}`);
    } else {
      if (file && result?.data?.id) {
        await uploadFile(result.data.id, file);
      }

      renderCarDetails();
      alert("Auto zostało dodane");
    }
  } catch (error) {
    alert("Wystąpił błąd podczas dodawania auta.");
    console.error(error);
  }

  addCarModal.classList.add("hidden");
  addCarForm.reset();
});


document.querySelector('input[name="paymentFile"]').addEventListener('change', (e) => {
  console.log("Plik wybrany:", e.target.files[0]);
});