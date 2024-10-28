"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dict = {};
// @ts-ignore
const frames = figma.currentPage.selection;
let iconsWithoutCategories = 0;
const exportIcon = (iconNode) => __awaiter(void 0, void 0, void 0, function* () {
    const buffer = yield iconNode.exportAsync({ format: 'SVG_STRING' });
    return buffer;
});
const addIcon = (iconNode) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let category;
    if (((_a = iconNode.parent) === null || _a === void 0 ? void 0 : _a.type) == 'PAGE') {
        category = 'NO CATEGORY';
        iconsWithoutCategories++;
    }
    else {
        category = (_b = iconNode.parent) === null || _b === void 0 ? void 0 : _b.name;
    }
    dict[iconNode.name] = {
        description: iconNode.description,
        category,
        icon: yield exportIcon(iconNode)
    };
    console.log(dict[iconNode.name].icon);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (frames.length == 0) {
        figma.notify('No components selected');
        return;
    }
    for (const node of frames) {
        if (node.type == 'COMPONENT') {
            yield addIcon(node);
        }
        else if (node.type == 'FRAME') {
            for (const child of node.children) {
                if (child.type == 'COMPONENT') {
                    yield addIcon(child);
                }
            }
        }
    }
    figma.notify(`Successfully built file for ${frames.length} icon${frames.length == 1 ? '' : 's'}`);
    if (iconsWithoutCategories > 0) {
        figma.notify(`${iconsWithoutCategories} icon${iconsWithoutCategories > 1 ? 's do not have categories' : ' does not have a category'}`, {
            error: true
        });
    }
}))().then(() => {
    figma.showUI(__html__);
    figma.ui.postMessage(JSON.stringify(dict));
});
