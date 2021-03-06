'use strict';

/**
 *  This function takes the data in a dictionary object and updates a Chartjs object with the data. The
 *  dataset number for the Chartjs object and the keys for the x and y values are given in order to
 *  correctly update when there are multiple datasets in the Chartjs object or in the dictionary.
 *  @param tableData:   The dictionary object that provides data
 *  @param myChart: The Chartjs object
 *  @param dataSet: The number of line to be updated in the Chartjs object.
 *  @param xKey:    The key for x values in the dictionary.
 *  @param yKey:    The key for y values in the dictionary.
 */
export function updateLine(tableData, myChart, dataSet = 0, xKey = 'x', yKey = 'y') {
    let start = 0;
    let chart = myChart.data.datasets[dataSet].data;
    for (let i = 0; i < tableData.length; i++) {
        if (tableData[i][xKey] === '' || tableData[i][yKey] === '' ||
            tableData[i][xKey] === null || tableData[i][yKey] === null) {
            continue;
        }
        chart[start++] = { x: tableData[i][xKey], y: tableData[i][yKey] };
    }
    while (chart.length !== start) {
        chart.pop();
    }
    myChart.update(0);
}

/**
 *  This function takes the labels from the chart and updates the the data property of the form with the labels.
 *  @param myChart: The Chartjs object
 *  @param form:    The form to be updated.
 */
export function updateLabels(myChart, form, immData = false, immTitle = false, immX = false, immY = false) {
    let labels = "";
    for (let i = 0; i < myChart.data.datasets.length; i++) {
        if (!myChart.data.datasets[i].hidden && !myChart.data.datasets[i].immutableLabel) {
            if (labels !== "") {
                labels += ", ";
            }
            labels += myChart.data.datasets[i].label;
        }
    }
    form.data.value = labels;

    if (myChart.options.title.text) {
        form.title.value = myChart.options.title.text;
    }
    if (myChart.options.scales.xAxes[0].scaleLabel.labelString) {
        form.xAxis.value = myChart.options.scales.xAxes[0].scaleLabel.labelString;
    }
    if (myChart.options.scales.yAxes[0].scaleLabel.labelString) {
        form.yAxis.value = myChart.options.scales.yAxes[0].scaleLabel.labelString;
    }

    form.data.disabled = immData;
    form.title.disabled = immTitle;
    form.xAxis.disabled = immX;
    form.yAxis.disabled = immY;
}

/**
 *  This function updates the height for the Handsontable object based on the number of rows it has.
 *  The min and max height is set to be 5 rows and the height of the right side of the page, respectively.
 *  @param table:   The Handsontable object whose height is to be updated.
 */
export function updateTableHeight(table) {
    const rowHeights = 23;
    const columnHeaderHeight = 26;

    let typeForm = document.getElementById('chart-type-form').clientHeight;
    let inputDiv = document.getElementById('input-div').clientHeight;
    let chartDiv = document.getElementById('chart-div').clientHeight;
    let infoForm = document.getElementById('chart-info-form').clientHeight;

    let minHeight = Math.min(5, table.countRows()) * rowHeights + columnHeaderHeight + 5;
    let maxHeight = Math.max(minHeight, chartDiv + infoForm - typeForm - inputDiv);
    let height = table.countRows() * rowHeights + columnHeaderHeight + 5;

    if (height > maxHeight) {
        height = maxHeight;
    }

    table.updateSettings({ stretchH: 'none', });
    table.updateSettings({ height: height, });
    table.updateSettings({
        stretchH: 'all',
    });
}

// Credits: https://stackoverflow.com/a/30407959/1154380
export function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

/**
 * Get the current date in the format of "YYYY:MM:DD HH:MM:SS"
 */
export function getDateString() {
    let date = new Date();
    let year = '' + date.getFullYear();
    let month = dateAppendZero(date.getMonth());
    let days = dateAppendZero(date.getDate());

    let hour = dateAppendZero(date.getHours());
    let minute = dateAppendZero(date.getMinutes());
    let second = dateAppendZero(date.getSeconds());

    return year + ':' + month + ':' + days + ' ' + hour + ':' + minute + ':' + second;
}

/**
 * Pre-fix a number with '0' if it is less then 10. Otherwise just convert it to string.
 * @param num: A number between 1 and 99.
 * @returns two-character string containing the number and a leading 0 if necessary.
 */
function dateAppendZero(num) {
    return num < 10 ? '0' + num : '' + num;
}