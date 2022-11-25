using Core.AuthLib.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Core.AuthLib;

public static class AuthConfigurator
{
    public static void AddCookieAuth(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new RsaSecurityKey(RsaService.ImportRSAKey("./keys/" + builder.Configuration["RSA:private-key"]))
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["Authorization"];
                        return Task.CompletedTask;
                    }
                };
            });

        builder.Services.AddAuthorization(opt =>
        {
            opt.AddPolicy("ID-Token", policy => policy.RequireClaim("type", "id-token"));
            opt.AddPolicy("Auth-Token", policy => policy.RequireClaim("type", "auth-token"));
        });
    }

    //Todo - AddCookieAuth
    public static void AddHeaderAuth(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new RsaSecurityKey(RsaService.ImportRSAKey("./keys/" + builder.Configuration["RSA:public-key"]))
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["Authorization"];
                        return Task.CompletedTask;
                    }
                };
            });

        builder.Services.AddAuthorization(opt =>
        {
            opt.AddPolicy("ID-Token", policy => policy.RequireClaim("type", "id-token"));
            opt.AddPolicy("Auth-Token", policy => policy.RequireClaim("type", "auth-token"));
        });
    }
}
