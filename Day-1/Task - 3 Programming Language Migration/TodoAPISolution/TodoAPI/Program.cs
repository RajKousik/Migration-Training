using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TodoAPI.Interfaces.Repository;
using TodoAPI.Interfaces.Service;
using TodoAPI.Models;
using TodoAPI.Repositories;
using TodoAPI.Services;

namespace TodoAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSwaggerGen(option =>
            {
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                     {
                           new OpenApiSecurityScheme
                           {
                                 Reference = new OpenApiReference
                                 {
                                     Type = ReferenceType.SecurityScheme,
                                     Id = "Bearer"
                                 }
                           },
                           new string[] {}
                     }
                });
            });

            builder.Services.AddDbContext<TodoContext>(options =>
            {
                options.UseSqlServer("Data Source=823CBX3\\DEMOINSTANCE;Integrated Security=True;Initial Catalog=dbTodoManagement;");
            });

            builder.Services.AddScoped<IRepository<int, User>, UserRepository>();


            // Register services
            builder.Services.AddScoped<IUserService, UserService>();

            builder.Services.AddScoped<IRepository<int, Todo>, TodoRepository>();

            // Register services
            builder.Services.AddScoped<ITodoService, TodoService>();


            builder.Services.AddCors(opts =>
            {
                opts.AddPolicy("AllowAllCorsPolicy", options =>
                {
                    options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAllCorsPolicy");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
