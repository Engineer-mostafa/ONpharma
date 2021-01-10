using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Windows.Forms;

namespace DBapplication
{
    public class Controller
    {
        DBManager dbMan;

        public Controller()
        {
            dbMan = new DBManager();
        }

        public int InsertSupplier(string snum, string sname, string city, int status)
        {
            string query = "INSERT INTO S (S#, Name, City, Status) " +
                            "Values ('" + snum + "','" + sname + "','" + city + "'," + status + ");";
            return dbMan.ExecuteNonQuery(query);
        }

        public int DeleteSupplier(string snum)
        {
            string query = "DELETE FROM S WHERE S#='" + snum + "';";
            return dbMan.ExecuteNonQuery(query);
        }

        public int UpdateSupplier(string snum, string city)
        {
            string query = "UPDATE S SET City='" + city + "' WHERE S#='" + snum + "';";
            return dbMan.ExecuteNonQuery(query);
        }

        public DataTable SelectAllSuppliers()
        {
            string query = "SELECT * FROM S;";
            return dbMan.ExecuteReader(query);
        }

        public int CountSuppliers()
        {
            string query = "SELECT COUNT(S#) FROM S;";
            return (int)dbMan.ExecuteScalar(query);
        }

        public void TerminateConnection()
        {
            dbMan.CloseConnection();
        }
    }
}
