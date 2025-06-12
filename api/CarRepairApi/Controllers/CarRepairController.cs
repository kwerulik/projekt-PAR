using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRepairApi.Models;

namespace CarRepairApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarRepairController : ControllerBase
    {
        private readonly CarRepairContext _context;
        public CarRepairController(CarRepairContext context)
        {
            _context = context;
            if (!_context.CarRepairs.Any())
            {
                _context.CarRepairs.AddRange(
                    [
                    new CarRepair { 
                        PlateNumber = "GWE 2137W",
                        Make = "VolksWagen",
                        Model = "Golf",
                        Note = "Wycinanie kata",
                        Owner = "Seba z Osiedla" },

                    new CarRepair {
                        PlateNumber = "KR1234AB",
                        Make = "Toyota",
                        Model = "Corolla",
                        Note = "Wymiana oleju silnikowego i filtra",
                        Owner = "Jan Kowalski",
                        StartDate = new DateOnly(2025, 3, 10),
                        EndDate = new DateOnly(2025, 3, 11)},

                    new CarRepair {
                        PlateNumber = "WA4567CD",
                        Make = "Audi",
                        Model = "A3",
                        Note = "Naprawa układu hamulcowego",
                        Owner = "Anna Nowak",
                        StartDate = new DateOnly(2025, 4, 2),
                        EndDate = new DateOnly(2025, 4, 4)},

                    new CarRepair {
                        PlateNumber ="PO8910EF",
                        Make = "Renault",
                        Model = "Megane",
                        Note = "Wymiana sprzęgła",
                        Owner = "Piotr Zieliński",
                        StartDate = new DateOnly(2025, 2, 15),
                        EndDate = new DateOnly(2025, 2, 17)}
                ]);
                _context.SaveChanges();
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarRepair>>> GetCars()
        {
            return await _context.CarRepairs.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CarRepair>> GetCarRepair(int id)
        {
            var CarRepair = await _context.CarRepairs.FindAsync(id);
            if (CarRepair == null) return NotFound();
            return CarRepair;
        }

        [HttpPost]
        public async Task<ActionResult<CarRepair>> PostCarRepair(CarRepair CarRepair)
        {
            _context.CarRepairs.Add(CarRepair);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCarRepair), new { id = CarRepair.Id }, CarRepair);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarRepair(int id, CarRepair CarRepair)
        {
            if (id != CarRepair.Id) return BadRequest();

            var existingCarRepair = await _context.CarRepairs.FindAsync(id);
            if (existingCarRepair == null) return NotFound();

            _context.Entry(existingCarRepair).State = EntityState.Detached;
            _context.CarRepairs.Update(CarRepair);

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CarRepairExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarRepair(int id)
        {
            var CarRepair = await _context.CarRepairs.FindAsync(id);
            if (CarRepair == null) return NotFound();

            _context.CarRepairs.Remove(CarRepair);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private async Task<bool> CarRepairExists(int id)
        {
            return await _context.CarRepairs.AnyAsync(e => e.Id == id);
        }
        
        [HttpPost("upload/{id}")]
        public async Task<IActionResult> UploadPaymentDoc(int id, IFormFile file)
        {
            try
            {
                var carRepair = await _context.CarRepairs.FindAsync(id);
                if (carRepair == null)
                    return NotFound(new { message = "Zgłoszenie nie istnieje." });

                if (file == null || file.Length == 0)
                    return BadRequest(new { message = "Plik jest pusty lub nie przesłano pliku." });

                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    carRepair.PaymentDocData = memoryStream.ToArray();
                    carRepair.PaymentDocFileName = file.FileName;
                    carRepair.PaymentDocContentType = file.ContentType;
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Plik przesłany pomyślnie" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Błąd podczas przesyłania pliku: " + ex.Message });
            }
        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadPaymentDoc(int id)
        {
            try
            {
                var carRepair = await _context.CarRepairs.FindAsync(id);
                if (carRepair == null)
                    return NotFound(new { message = "Zgłoszenie nie istnieje." });

                if (carRepair.PaymentDocData == null)
                    return NotFound(new { message = "Nie znaleziono pliku faktury." });

                return File(
                    carRepair.PaymentDocData,
                    carRepair.PaymentDocContentType ?? "application/octet-stream",
                    carRepair.PaymentDocFileName ?? "document.pdf"
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Błąd podczas pobierania pliku: " + ex.Message });
            }
        }

    }
}
