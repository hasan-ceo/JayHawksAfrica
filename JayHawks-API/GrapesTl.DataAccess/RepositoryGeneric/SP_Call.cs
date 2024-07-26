using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrapesTl.Service;

public class SP_Call : ISP_Call
{
    private readonly ApplicationDbContext _db;
    private static string ConnectionString = "";

    public SP_Call(ApplicationDbContext db)
    {
        _db = db;
        ConnectionString = db.Database.GetDbConnection().ConnectionString;
    }


    public async Task Execute(string procedureName, DynamicParameters param = null)
    {
        using SqlConnection sqlCon = new(ConnectionString);
        sqlCon.Open();
        await sqlCon.ExecuteAsync(procedureName, param, commandType: System.Data.CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<T>> List<T>(string procedureName, DynamicParameters param = null)
    {
        using SqlConnection sqlCon = new(ConnectionString);
        sqlCon.Open();
        return await sqlCon.QueryAsync<T>(procedureName, param, commandType: System.Data.CommandType.StoredProcedure);
    }

    public Tuple<IEnumerable<T1>, IEnumerable<T2>> List<T1, T2>(string procedureName, DynamicParameters param = null)
    {
        using (SqlConnection sqlCon = new(ConnectionString))
        {
            sqlCon.Open();
            var result = SqlMapper.QueryMultiple(sqlCon, procedureName, param, commandType: System.Data.CommandType.StoredProcedure);
            var item1 = result.Read<T1>().ToList();
            var item2 = result.Read<T2>().ToList();


            if (item1 != null && item2 != null)
            {
                return new Tuple<IEnumerable<T1>, IEnumerable<T2>>(item1, item2);
            }

        }

        return new Tuple<IEnumerable<T1>, IEnumerable<T2>>(new List<T1>(), new List<T2>());
    }

    public async Task<T> OneRecord<T>(string procedureName, DynamicParameters param = null)
    {
        using SqlConnection sqlCon = new(ConnectionString);
        sqlCon.Open();
        var value = await sqlCon.QueryAsync<T>(procedureName, param, commandType: System.Data.CommandType.StoredProcedure);
        return (T)Convert.ChangeType(value.FirstOrDefault(), typeof(T));
    }

    public async Task<T> Single<T>(string procedureName, DynamicParameters param = null)
    {
        using SqlConnection sqlCon = new(ConnectionString);
        sqlCon.Open();
        return (T)Convert.ChangeType(await sqlCon.ExecuteScalarAsync<T>(procedureName, param, commandType: System.Data.CommandType.StoredProcedure), typeof(T));
    }
}
