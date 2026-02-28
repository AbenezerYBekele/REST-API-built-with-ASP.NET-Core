using Microsoft.AspNetCore.Mvc;

namespace MyWebAPI.Controllers
{
    public class WeatherForecast
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int TemperatureC { get; set; }
        public string? Summary { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static  readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild",
            "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private static readonly List <WeatherForecast> Forecasts = GenerateRandomForecasts(10);
        private static int _nextId = Forecasts.Count + 1;

        private static List <WeatherForecast> GenerateRandomForecasts(int count)
        {
            var rng = new Random();

            return Enumerable.Range(1, count).Select(index => new WeatherForecast
            {
                Id = index,
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 45),
                Summary = Summaries[rng.Next(Summaries.Length)]
            }).ToList();
        }
  
        [HttpGet]
        public ActionResult<IEnumerable<WeatherForecast>> Get()
        {
            return Ok(Forecasts);
        }

        [HttpGet("{id}")]
        public ActionResult<WeatherForecast> GetById(int id)
        {
            var forecast = Forecasts.FirstOrDefault(f => f.Id == id);

            if (forecast == null)
                return NotFound();

            return Ok(forecast);
        }

        [HttpPost]
        public ActionResult<WeatherForecast> Post([FromBody] WeatherForecast forecast)
        {
            forecast.Id = _nextId++;
            Forecasts.Add(forecast);

            return CreatedAtAction(nameof(GetById), new { id = forecast.Id }, forecast);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] WeatherForecast updatedForecast)
        {
            var existingForecast = Forecasts.FirstOrDefault(f => f.Id == id);

            if (existingForecast == null)
                return NotFound();

            existingForecast.Date = updatedForecast.Date;
            existingForecast.TemperatureC = updatedForecast.TemperatureC;
            existingForecast.Summary = updatedForecast.Summary;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var forecast = Forecasts.FirstOrDefault(f => f.Id == id);

            if (forecast == null)
                return NotFound();

            Forecasts.Remove(forecast);

            return NoContent();
        }
    }
}