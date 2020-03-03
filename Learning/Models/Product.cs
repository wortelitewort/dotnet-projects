﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        [Column("UnitPrice", TypeName = "money")]
        public double? Cost { get; set; }
        [Column("UnitsInStock")]
        public short? Stock { get; set; }
        public bool Discontinued { get; set; }

        // these two define the foreign key relationship to the Categories table
        public int CategoryID { get; set; }
        public virtual Category Category { get; set; }
    }
}
