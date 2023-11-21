using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Testt_IDO.DATA;

namespace Testt_IDO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly MyAppDbContext _dbContext;

        public ToDoController( MyAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var todos = _dbContext.ToDos.ToList();
                if (todos.Count == 0)
                {
                    return NotFound("ToDos not available");
                }
                return Ok(todos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{UserId}")]
        public IActionResult GetbyUserId(int UserId)
        {
            try
            {
                var ToDos = _dbContext.ToDos.Where(t => t.UserId == UserId).ToList();
                if (ToDos.Count == 0)
                {
                    return NotFound($"ToDo not Found with user id {UserId}");
                }

                return Ok(ToDos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Post([FromBody] ToDo model)
        {

            var user = _dbContext.Users.Find(model.UserId);
            if (user == null)
            {
                return NotFound($"User with Id {model.UserId} not found.");
            }
            _dbContext.ToDos.Add(model);
            _dbContext.SaveChanges();
                return Ok($"ToDo created with id ");
        }


        [HttpPut]
        public IActionResult Put(ToDo model)
        {
            if (model == null || model.ToDoId == 0)
            {
                if (model == null)
                {
                    return BadRequest("To Do is invalid");
                }
                else if (model.ToDoId == 0)
                {
                    return BadRequest($"To Do Id {model.ToDoId} is invalid");
                }
            }
            try
            {
                var ToDo = _dbContext.ToDos.Find(model.ToDoId);
                if (ToDo == null)
                {
                    return NotFound($"ToDo not found with id{model.ToDoId}");
                }
                ToDo.ToDoId = model.ToDoId; 
                ToDo.Title = model.Title;
                ToDo.Category = model.Category;
                ToDo.DueDate = model.DueDate;
                ToDo.Estimate = model.Estimate;
                ToDo.Status = model.Status;
                ToDo.UserId = model.UserId;
                _dbContext.SaveChanges();
                return Ok("todo updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
