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
                _context.CarRepairs.Add(new CarRepair { Make = "VolksWagen", Model = "Golf", Note = "Wycinanie kata", Owner = "Seba z Osiedla" });
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
    }
}
