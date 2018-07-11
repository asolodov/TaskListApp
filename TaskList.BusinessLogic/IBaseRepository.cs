using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskList.BusinessLogic
{
    public interface IBaseRepository<TKey, TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAll();

        Task<TEntity> GetById(TKey id);

        void Add(TEntity entity);

        void Update(TEntity entity);

        void Delete(TEntity entity);

        Task SaveChanges();
    }
}
