﻿using Microsoft.EntityFrameworkCore;
using static System.IO.Path;
using static System.Environment;

namespace LinqWithEFCore
{
    // this manages the connection to the database
    public class Northwind : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder)
        {
            // set database connection string
            string path = Combine(
                CurrentDirectory, "Northwind.db");
            optionsBuilder
                //.UseLazyLoadingProxies()
                .UseSqlite($"Filename={path}");
        }
        protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            // example of using Fluent API instead of attributes to limit
            // the length of a category name
            modelBuilder.Entity<Category>()
                 .Property(category => category.CategoryName)
                 .IsRequired()
                 .HasMaxLength(15);

            modelBuilder.Entity<Product>()
                .Property(product => product.ProductName)
                .IsRequired()
                .HasMaxLength(40);

            modelBuilder.Entity<Product>()
                .Property(product => product.QuantityPerUnit)
                .HasMaxLength(20);

            //// global filter to remove discontinued products
            //modelBuilder.Entity<Product>()
            //    .HasQueryFilter(p => !p.Discontinued);
        }
    }
}