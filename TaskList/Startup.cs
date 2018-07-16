using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Routing.Conventions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OData;
using Microsoft.OData.UriParser;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using TaskList.BusinessLogic.Tasks;
using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.DataAccess;
using TaskList.DataAccess.Repository;
using TaskList.Filters;
using TaskList.Infrastructure;

namespace TaskList
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options =>
                {
                    options.Filters.Add(typeof(ApiExceptionFilter));
                    options.Filters.Add(typeof(ApiModelValidationFilter));
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options => { options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc; });

            services.AddOData();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddDbContext<TaskListDbContext>(options => options.UseSqlite(Configuration.GetConnectionString("SQLite")));

            services.AddScoped<ITaskRepository, TaskRepository>();
            services.AddScoped<ITaskService, TaskService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");

                routes.SetTimeZoneInfo(TimeZoneInfo.Utc);
                routes.MapODataServiceRoute("ODataRoute", "api", builder => builder
                .AddService(Microsoft.OData.ServiceLifetime.Singleton, sp => ODataConfig.BuildEdmModel(app.ApplicationServices))
                .AddService<IEnumerable<IODataRoutingConvention>>(Microsoft.OData.ServiceLifetime.Singleton, sp => ODataRoutingConventions.CreateDefaultWithAttributeRouting("ODataRoute", routes))
                .AddService<ODataUriResolver>(Microsoft.OData.ServiceLifetime.Singleton, sp => new StringAsEnumResolver { EnableCaseInsensitive = true }));
           
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            AutoMapperConfig.RegisterMappings();
            EnsureDbCreated(app);
        }

        private void EnsureDbCreated(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<TaskListDbContext>();
                context.Database.EnsureCreated();
            }
        }
    }
}
