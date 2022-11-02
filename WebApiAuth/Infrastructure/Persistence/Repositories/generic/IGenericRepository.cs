using System.Linq.Expressions;

namespace WebApiAuth.Infrastructure.Persistence.Repositories.generic
{    public interface IGenericRepository<T> where T : class
    {
        T Add(T t);
        Task<T> AddAsync(T t);
        int Count();
        Task<int> CountAsync();
        void Delete(T entity);
        Task<int> DeleteAsync(T entity);
        void Dispose();
        T Find(Expression<Func<T, bool>> match);
        ICollection<T> FindAll(Expression<Func<T, bool>> match);
        Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> match);
        Task<T> FindAsync(Expression<Func<T, bool>> match);
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
        Task<ICollection<T>> FindByAsyn(Expression<Func<T, bool>> predicate);
        

        IQueryable<T> GetAllIncluding(params Expression<Func<T, object>>[] includeProperties);
        Task<ICollection<T>> GetAllAsync();
        IQueryable<T> GetAll();
        IQueryable<T> GetAll(params string[] including);
        IQueryable<T> GetAll(params Expression<Func<T, object>>[] including);

        T Get(int id);
        Task<T> GetAsync(int id);
        void Save();
        Task<int> SaveAsync();
        T Update(T t, object key);
        Task<T> UpdateAsync(T t, object key);
    }
}
