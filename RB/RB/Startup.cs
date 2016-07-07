using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RB.Startup))]
namespace RB
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
