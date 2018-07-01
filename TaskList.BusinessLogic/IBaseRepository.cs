using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TaskList.BusinessLogic
{
    public interface IBaseRepository<TKey, TEntity> where TEntity : class
    {
        IQueryable<TEntity> Get();

        TEntity GetById(TKey id);

        void Add(TEntity entity);

        void Update(TEntity entity);

        void Delete(TEntity entity);

        void SaveChanges();
    }
}
