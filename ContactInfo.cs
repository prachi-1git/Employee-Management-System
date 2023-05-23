using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ContactInfo
    {
        public long ID { get; set; } = -1;
        public string Name { get; set; } = "";
        public string State { get; set; } = "";
        public string Gender { get; set; } = "";
        public string Salary { get; set; } = "";
        public string MobileNo { get; set; } = "";
    }
}