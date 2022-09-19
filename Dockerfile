FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Core.Backend/Core.Backend.csproj", "Core.Backend/"]
RUN dotnet restore "Core.Backend/Core.Backend.csproj"
COPY . .
WORKDIR "/src/Core.Backend"
RUN dotnet build "Core.Backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Core.Backend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Core.Backend.dll"]
