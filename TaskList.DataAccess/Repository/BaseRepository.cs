using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskList.BusinessLogic;

namespace TaskList.DataAccess.Repository
{
    public class BaseRepository<TKey, TEntity> : IBaseRepository<TKey, TEntity> where TEntity : class
    {
        private readonly DbSet<TEntity> _dbSet;
        private readonly TaskListDbContext _dbContext;

        public BaseRepository(TaskListDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            _dbSet.Add(entity);
        }

        public void Delete(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            _dbSet.Remove(entity);
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<TEntity> GetById(TKey id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            var entry = _dbContext.Entry(entity);
            if (entry.State != EntityState.Modified)
            {
                if (entry.State == EntityState.Detached)
                {
                    _dbSet.Attach(entity);
                    entry.State = EntityState.Modified;
                }
            }
        }

        public async Task SaveChanges()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
