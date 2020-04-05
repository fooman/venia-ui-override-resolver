const name = 'fooman/venia-ui-override-resolver';
const VeniaUiResolverPlugin = require('./lib/VeniaUiResolverPlugin');
const path = require('path');
const {cachedCleverMerge} = require('webpack/lib/util/cleverMerge');

const customStoreDir = path.resolve(__dirname, '..', '..', '..', 'src', 'overrides');
const veniaUiModulePath = path.resolve(__dirname, '..', '..', '..', 'node_modules', '@magento', 'venia-ui', 'lib');

const myResolverPlugin = new VeniaUiResolverPlugin({
    name: name,
    projectPath: customStoreDir,
    veniaUiModulePath: veniaUiModulePath
});

module.exports = targets => {
    const webpackCompiler = targets.of('@magento/pwa-buildpack').webpackCompiler;
    webpackCompiler.tap(compiler =>
        compiler.resolverFactory.hooks.resolveOptions
            .for('normal')
            .tap('AddVeniaResolverToWebpackConfig', resolveOptions => {
                const plugin = Object.assign(
                    {
                        plugins: [myResolverPlugin]
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
                        plugins: [myResolverPlugin]
                    });
                return cachedCleverMerge(plugin, resolveOptions);
            })
    );
};
