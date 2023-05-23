using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using WebApplication1.Models;
using WebApplication1.Utils;



namespace WebApplication1.businesslayer
{
    public class Class1Layer
    {
        public static List<ContactInfo> getContactInfoList(string ID = "", string Name = "", string State = "", string Gender = "", string Salary = "", string MobileNo = "")
        {
            List<ContactInfo> objContactInfoList = new List<ContactInfo>();
            string strSql = "SELECT * from Table_Record";


            if (ID != "")
            {
                strSql += " and ID in (" + ID + ")";
            }
            if (Name != "")
            {
                strSql += " and Name ='" + Name + "'";
            }
            if (State != "")
            {
                strSql += " and state ='" + State + "'";
            }
            if (Gender != "")
            {
                strSql += " and Gender ='" + Gender + "'";
            }
            if (Salary != "")
            {
                strSql += " and Salary ='" + Salary + "'";
            }
            if (MobileNo != "")
            {
                strSql += " and MobileNo ='" + MobileNo + "'";
            }
            SqlDataReader dr = Utils.SqlHelper.ExecuteReader(strSql);
            while (dr.Read())
            {

                ContactInfo objContactInfo = new ContactInfo();
                if (!DBNull.Value.Equals(dr["ID"]))
                    objContactInfo.ID = Convert.ToInt64(dr["ID"]);
                else objContactInfo.ID = 0;
                if (!DBNull.Value.Equals(dr["Name"]))
                    objContactInfo.Name = dr["Name"].ToString();
                else objContactInfo.Name = "";
                if (!DBNull.Value.Equals(dr["State"]))
                    objContactInfo.State = dr["State"].ToString();
                else objContactInfo.State = "";
                if (!DBNull.Value.Equals(dr["Gender"]))
                    objContactInfo.Gender = dr["Gender"].ToString();
                else objContactInfo.Gender = "";
                if (!DBNull.Value.Equals(dr["Salary"]))
                    objContactInfo.Salary = dr["Salary"].ToString();
                else objContactInfo.Salary = "";
                if (!DBNull.Value.Equals(dr["MobileNo"]))
                    objContactInfo.MobileNo = dr["MobileNo"].ToString();
                else objContactInfo.MobileNo = "";
                objContactInfoList.Add(objContactInfo);
            }
            dr.Close();
            return objContactInfoList;


        }
        public static long createContactInfo(ContactInfo objContactInfo)
        {
            string strSql = "insert into Table_Record (Name, State, Gender,Salary,MobileNo)"
                            + " values(@Name, @State, @Gender, @Salary, @MobileNo)";

            List<SqlParameter> param = new List<SqlParameter>();
            param.Add(new SqlParameter("NAME", objContactInfo.Name));
            param.Add(new SqlParameter("State", objContactInfo.State));
            param.Add(new SqlParameter("Gender", objContactInfo.Gender));
            param.Add(new SqlParameter("Salary", objContactInfo.Salary));
            param.Add(new SqlParameter("MobileNo", objContactInfo.MobileNo));

            return Utils.SqlHelper.ExecuteNonQueryReturnPK(strSql, param.ToArray());

        }
        public static long updateContactInfo(ContactInfo objContactInfo)
        {
            string strSql = "update Table_Record set  Name=@Name, State=@State, Gender=@Gender, Salary=@Salary, MobileNo=@MobileNo" + " where ID=@ID";

            List<SqlParameter> param = new List<SqlParameter>();
            param.Add(new SqlParameter("ID", objContactInfo.ID));
            param.Add(new SqlParameter("Name", objContactInfo.Name));
            param.Add(new SqlParameter("State", objContactInfo.State));
            param.Add(new SqlParameter("Gender", objContactInfo.Gender));
            param.Add(new SqlParameter("Salary", objContactInfo.Salary));
            param.Add(new SqlParameter("MobileNo", objContactInfo.MobileNo));

            return Utils.SqlHelper.ExecuteNonQuery(strSql, param.ToArray());

        }

        public static long checkContactInfoExist(long ID = -1, string Name = "")
        {
            string strSql = "select * from Table_Record where 1=1";

            if (ID != -1)
            {
                strSql += " and ID in (" + ID + ")";
            }
            if (Name != "")
            {
                strSql += " and Name ='" + Name + "'";
            }

            strSql = strSql.Replace("where and", "where");

            SqlDataReader dr = Utils.SqlHelper.ExecuteReader(strSql);
            ID = -1;
            if (dr.Read())
            {
                ID = Convert.ToInt64(dr["ID"]);
            }
            dr.Close();
            return ID;
        }



        public static long deleteContactInfo(string ID)
        {
            string strSql = "Delete From Table_Record Where ID in (" + ID + ")";
            return Utils.SqlHelper.ExecuteNonQuery(strSql);
        }



    }
}
