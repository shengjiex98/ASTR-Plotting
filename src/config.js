'use strict';

export const tableCommonOptions = {
    rowHeights: 23,
    columnHeaderHeight: 26,
    rowHeaders: true,
    width: '100%',
    stretchH: 'all',
    contextMenu: [
        'undo',
        'redo',
        '---------',
        'row_above',
        'row_below',
        '---------',
        'remove_row'
    ],
    fillHandle: {
        autoInsertRow: true,
    },
};

// The hexToDecimal() function only accepts lower case (can make it supports upper case)
export const colors = {
    'blue': rgbString('#41a3d1'),
    'red': rgbString('#cf4e49'),
    'yellow': rgbString('#ced139'),
    'purple': rgbString('#c382d1'),
    'gray': rgbString('#9a9a9a'),
    'orange': rgbString('#ff8e21'),
    'bright': rgbString('#ffee51'),
    'white': rgbString('#ffffff'),
    'black': rgbString('#000000'),
    'white-0': rgbString('#ffffff', 0),
    'blue-0.5': rgbString('#41a3d1', 0.5),
};

/**
 *  This function takes a string containing a hexadecimal number and return a rgb string represented
 *  by the value of rgb.
 *  @param rgb:     A string containing a hexadecimal number which represents a rgb value.
 *  @param opacity: Opacity of the returned rgb string. Default is 1.
 *  @returns {string}
 */
function rgbString(rgb, opacity = 1) {
    let r = hexToDecimal(rgb, 1, 2);
    let g = hexToDecimal(rgb, 3, 4);
    let b = hexToDecimal(rgb, 5, 6);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
}

/**
 *  This function takes a portion of string which contains a hexadecimal number and returns a decimal
 *  number of the same value with the hex number.
 *  @param hex:     The whole string.
 *  @param s:       The starting position of the portion of the string. Inclusive.
 *  @param t:       The ending position of the portion of the string. Inclusive.
 *  @returns {number}
 */
function hexToDecimal(hex, s, t) {
    let result = 0;
    for (let i = s; i <= t; i++) {
        result <<= 4;
        if (hex[i] >= '0' && hex[i] <= '9') {
            result += hex[i].charCodeAt(0) - '0'.charCodeAt(0);
        } else {
            result += hex[i].charCodeAt(0) - 'a'.charCodeAt(0) + 10;
        }
    }
    return result;
}