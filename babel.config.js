module.exports = function (api) {
	const isTest = api.env('test');
	const presetEnvTest = [
		'@babel/preset-env',
		{
			targets: {
				node: 'current',
			},
		},
	];

	api.cache(true);

	const presets = [isTest ? presetEnvTest : '@babel/preset-env'];

	return {presets};
};
