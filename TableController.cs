using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Drawing;
using System.Drawing.Printing;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;
using WebApplication1.businesslayer;
using WebApplication1.Models;
using WebApplication1.Utils;

namespace WebApplication1.Controllers
{
    public class TableController : ApiController
    {


        [HttpGet]
        [Route("CommonTable/GetTableDefinition")]
        public IHttpActionResult GetTableDefinition()
        {
            List<ContactInfo> objContactInfoList = Class1Layer.getContactInfoList();
            if (objContactInfoList.Count > 0)
                return Json(objContactInfoList);
            else
                return Json("Records Not Found!");
        }
              


        [HttpPost]
        [Route("TableDefinition/InsertUpdateTableDefinition/{ID}/{Name}/{State}/{Gender}/{Salary}/{MobileNo}")]
        public IHttpActionResult InsertUpdateTableDefinition(long ID,string Name, string State, string Gender, string Salary, string MobileNo)
        {
            ContactInfo objTableInfo = new ContactInfo();
           // objTableInfo.ID = Convert.ToInt64(ID);
            objTableInfo.Name = Name;
            objTableInfo.State = State;
            objTableInfo.Gender = Gender;
            objTableInfo.Salary = Salary;
            objTableInfo.MobileNo = MobileNo;

            objTableInfo.ID = Class1Layer.checkContactInfoExist(-1, Name);
            if (objTableInfo.ID != -1 && objTableInfo.ID != ID)
                return Json("Record Already Exists!");
            if (ID == -1)
            {
                objTableInfo.ID = Class1Layer.createContactInfo(objTableInfo);
            }
            else
            {
                objTableInfo.ID = ID;
                Class1Layer.updateContactInfo(objTableInfo);
            }
            return Json(objTableInfo);

        }



        [HttpPost]
        [Route("TableDefinition/DeleteTableDefinition/{ID}")]
        public IHttpActionResult DeleteTableDefinition(string ID = "")
        {
            Class1Layer.deleteContactInfo(ID.ToString());
            return Json("Successfully Deleted!");
        }


    }
}
