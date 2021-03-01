const VeniaUiResolverPlugin = require('./lib/VeniaUiResolverPlugin');
const path = require('path');
const {cachedCleverMerge} = require('webpack/lib/util/cleverMerge');

const packagesToOverride = process.env.FOOMAN_OVERRIDEPACKAGES
    ? process.env.FOOMAN_OVERRIDEPACKAGES.split(',')
    : ['@magento/venia-ui/lib' , '@magento/peregrine/lib'];

let resolverPlugins = [];

packagesToOverride.forEach(function(package) {
    const parts = package.split('/');
    const namespace = parts[0];
    const packagename = parts[1];
    const mainFolder = parts[2];
    const pluginName = 'fooman/' + packagename + '-override-resolver';
    const destinationDir = path.resolve(__dirname, '..', '..', '..', 'src', 'overrides', packagename);
    const sourceDir = path.resolve(__dirname, '..', '..', '..', 'node_modules', namespace, packagename, mainFolder);

    const myResolverPlugin = new VeniaUiResolverPlugin({
        name: pluginName,
        projectPath: destinationDir,
        veniaUiModulePath: sourceDir
    });
    resolverPlugins.push(myResolverPlugin);
});

module.exports = targets => {
    const webpackCompiler = targets.of('@magento/pwa-buildpack').webpackCompiler;
    webpackCompiler.tap(compiler =>
        compiler.resolverFactory.hooks.resolveOptions
            .for('normal')
            .tap('AddVeniaResolverToWebpackConfig', resolveOptions => {
                const plugin = Object.assign(
                    {
                        plugins: resolverPlugins
                    });
                return cachedCleverMerge(plugin, resolveOptions);
            })
    );
    webpackCompiler.tap(compiler =>
        compiler.resolverFactory.hooks.resolveOptions
            .for('context')
            .tap('AddVeniaResolverToWebpackConfig', resolveOptions => {
                const plugin = Object.assign(
                    {
                        plugins: resolverPlugins
                    });
                return cachedCleverMerge(plugin, resolveOptions);
            })
    );
};
