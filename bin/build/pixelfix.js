// Derived from https://github.com/Corecii/Transparent-Pixel-Fix
"use strict";

import { Jimp as jimp } from "jimp";
import { Delaunay } from "d3-delaunay";

const neighborLocations = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0]
];

async function fixImage(filePath) {
    let image = await jimp.read(filePath);

    let voronoiPoints = [];
    let voronoiColors = [];
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        let alpha = this.bitmap.data[idx + 3];
        if (alpha != 0) {
            let red = this.bitmap.data[idx + 0];
            let green = this.bitmap.data[idx + 1];
            let blue = this.bitmap.data[idx + 2];
            // Voronoi
            for (let offset of neighborLocations) {
                let neighborAlpha = this.bitmap.data[image.getPixelIndex(x + offset[0], y + offset[1]) + 3];
                if (neighborAlpha == 0) {
                    voronoiPoints.push([x, y]);
                    voronoiColors.push([red, green, blue]);
                    break;
                }
            }
        }
    });
    if (voronoiPoints.length > 0) {
        let dela = Delaunay.from(voronoiPoints);
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            let alpha = this.bitmap.data[idx + 3];
            if (alpha == 0) {
                let closestIndex = dela.find(x, y);
                if (closestIndex != -1) {
                    let color = voronoiColors[closestIndex];

                    this.bitmap.data[idx + 0] = color[0];
                    this.bitmap.data[idx + 1] = color[1];
                    this.bitmap.data[idx + 2] = color[2];
                }
            }
        });
        await image.write(filePath);
    }
}
export default fixImage;