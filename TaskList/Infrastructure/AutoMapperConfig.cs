namespace TaskList.Infrastructure
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            AutoMapper.Mapper.Initialize(t =>
            t.AddProfiles(
                typeof(AutoMapperConfig).Assembly));
        }
    }
}
