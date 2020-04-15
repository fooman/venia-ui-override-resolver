const name = 'fooman/venia-ui-override-resolver';
const VeniaUiResolverPlugin = require('./lib/VeniaUiResolverPlugin');
const path = require('path');
const {cachedCleverMerge} = require('webpack/lib/util/cleverMerge');

const customStoreDir = path.resolve(__dirname, '..', '..', '..', 'src', 'overrides', 'venia-ui');
const customLibDir = path.resolve(__dirname, '..', '..', '..', 'src', 'overrides', 'peregrine');
const veniaUiModulePath = path.resolve(__dirname, '..', '..', '..', 'node_modules', '@magento', 'venia-ui', 'lib');
const peregrineModulePath = path.resolve(__dirname, '..', '..', '..', 'node_modules', '@magento', 'peregrine', 'lib');

const myResolverPlugin = new VeniaUiResolverPlugin({
    name: name,
    projectPath: customStoreDir,
    veniaUiModulePath: veniaUiModulePath
});

const myPeregrineResolverPlugin = new VeniaUiResolverPlugin({
    name: 'fooman/peregrine-override-resolver',
    projectPath: customLibDir,
    veniaUiModulePath: peregrineModulePath
});

module.exports = targets => {
    const webpackCompiler = targets.of('@magento/pwa-buildpack').webpackCompiler;
    webpackCompiler.tap(compiler =>
        compiler.resolverFactory.hooks.resolveOptions
            .for('normal')
            .tap('AddVeniaResolverToWebpackConfig', resolveOptions => {
                const plugin = Object.assign(
                    {
                        plugins: [myResolverPlugin, myPeregrineResolverPlugin]
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
                        plugins: [myResolverPlugin, myPeregrineResolverPlugin]
                    });
                return cachedCleverMerge(plugin, resolveOptions);
            })
    );
};
