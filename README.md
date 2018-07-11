# TaskListApp

This is task list web app based on ASP.NET Core 2.1 and Angular 6.

## Pre-requirements

.NET Core Runtime version 2.1.  
https://www.microsoft.com/net/download/windows

Node.js version 8.9 or greater.  
https://nodejs.org/en/


## Build and run

Install Angular CLI globally  
'npm install -g @angular/cli'

#### Development

1. Run command 'dotnet run --project .\TaskList\TaskList.csproj'  
2. Launch http://localhost:5000

#### Production

1. Run 'dotnet publish --output .\publish --configuration Release'
2. Change dir to '.\TaskList\publish\'
3. Run 'dotnet TaskList.dll'
4. Launch http://localhost:5000