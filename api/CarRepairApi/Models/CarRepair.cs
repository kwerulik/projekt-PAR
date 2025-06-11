namespace CarRepairApi.Models
{
    public class CarRepair
    {
        public int Id { get; set; }
        public required string Make { get; set; }
        public required string Model { get; set; }
        public required string Note { get; set; }
        public required string Owner { get; set; }
        public required string PlateNumber { get; set; }
        public string? PaymentDoc { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
    }
}
