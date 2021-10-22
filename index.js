"use strict";

//    gulp-avif-html    \\
/*
© Copyright (22.10.2021) by powerrampage
Github: https://github.com/powerrampage/
Telegram: t.me/powerrampage
*/
//    gulp-avif-html    //

const pluginName = 'gulp-xv-avif-html'
const gutil = require('gulp-util')
const PluginError = gutil.PluginError
const through = require('through2')

module.exports = function (extensions) {
	var extensions = extensions || ['.jpg', '.png', '.gif', '.jpeg', '.webp', '.svg']
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file)
			return
		}
		if (file.isStream()) {
			cb(new PluginError(pluginName, 'Streaming not supported'))
			return
		}
		try {
			let inPicture = false

			const data = file.contents
				.toString()
				.split('\n')
				.map(function (line) {
					if (line.indexOf('<picture') + 1) inPicture = true
					if (line.indexOf('</picture') + 1) inPicture = false

					if (line.indexOf('<img') + 1 && !inPicture) {
						let Re = /<img([^>]+)src=[\"\'](\S+)[\"\']([^>\/]+)\/?>/gi
						let regexpArray = Re.exec(line)
						let imgTag = regexpArray[0]
						let srcImage = regexpArray[2]
						let newAvifUrl = srcImage

						if (srcImage.indexOf('.avif') + 1) return line
						extensions.forEach(ext => {
							if (srcImage.indexOf(ext) == -1) {
								return line;

							} else {
								newAvifUrl = newAvifUrl.replace(ext, '.avif')

								switch (ext) {
									case '.jpg':
										line = '<picture>' +
											'<source srcset="' + newAvifUrl + '" type="image/avif" decoding="async" loading="lazy">' +
											imgTag +
											'</picture>'
										break;

									case '.png':
										line = '<picture>' +
											'<source srcset="' + newAvifUrl + '" type="image/avif" decoding="async" loading="lazy">' +
											imgTag +
											'</picture>'
										break;


									case '.svg':
										line = '<picture>' +
											'<source srcset="' + newAvifUrl + '" type="image/avif" decoding="async" loading="lazy">' +
											imgTag +
											'</picture>'
										break;

									case '.webp':
										line = '<picture>' +
											'<source srcset="' + newAvifUrl + '" type="image/avif" decoding="async" loading="lazy">' +
											imgTag +
											'</picture>'
										break;

									case '.gif':
										line = '<picture>' +
											'<source srcset="' + srcImage + '" media="(prefers-reduced-motion: reduce)" decoding="async" loading="lazy">' +
											imgTag +
											'</picture>'
										break;

									default:
										line = '<picture>' +
											'<source srcset="' + newAvifUrl + '" type="image/avif" decoding="async" loading="lazy">' +
											imgTag +
											'</picture>'
								}
							}
						});
						return line
					}
					return line
				})
				.join('\n')
			file.contents = new Buffer.from(data)
			this.push(file)
		} catch (err) {
			this.emit('error', new PluginError(pluginName, err))
		}
		cb()
	})
}
