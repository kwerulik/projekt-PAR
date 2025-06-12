import { renderCarDetails } from "../script.js";

export let cars = [];

export async function getCars() {
  try {
    const response = await fetch("http://localhost:5180/api/CarRepair");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Błąd ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd podczas pobierania aut:", error.message);
    return { status: "error", message: error.message };
  }
}

export async function removeFromCar(carId) {
  try {
    const response = await fetch(
      `http://localhost:5180/api/CarRepair/${carId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Błąd ${response.status}: ${errorText}`);
    }

    console.log(`Car with ID ${carId} deleted`);
    return {
      status: "success",
      message: `Samochód o ID ${carId} został usunięty.`,
    };
  } catch (error) {
    console.error("Błąd przy usuwaniu auta:", error.message);
    return { status: "error", message: error.message };
  }
}

export async function updateCar(carId, newCar) {
  newCar.id = carId;

  try {
    const response = await fetch(
      `http://localhost:5180/api/CarRepair/${carId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Błąd ${response.status}: ${errorText}`);
    }

    console.log("Auto zaktualizowane poprawnie");
    await renderCarDetails();
    return { status: "success", message: "Auto zaktualizowane poprawnie" };
  } catch (error) {
    console.error("Błąd przy aktualizacji auta:", error.message);
    return { status: "error", message: error.message };
  }
}

export async function addCar(newCar) {
  try {
    const response = await fetch("http://localhost:5180/api/CarRepair", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Błąd ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(data);
    await renderCarDetails();
    return { status: "success", message: "Auto dodane poprawnie", data };
  } catch (error) {
    console.error("Błąd przy dodawaniu auta:", error.message);
    return { status: "error", message: error.message };
  }
}

export async function uploadFile(carId, file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      `http://localhost:5180/api/CarRepair/upload/${carId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Błąd ${response.status}: ${errorText}`);
    }

    console.log("Plik przesłany poprawnie");
    return { status: "success", message: "Plik przesłany poprawnie" };
  } catch (error) {
    console.error("Błąd przesyłania pliku:", error.message);
    return { status: "error", message: error.message };
  }
}