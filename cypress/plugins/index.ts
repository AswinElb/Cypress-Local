import Mochawesome from 'Mochawesome';
import { mochawesomeJson } from 'mochawesome-report-generator/mochawesomeJson';
import path from 'path';

import { Runner } from 'mocha';
//import { merge } from 'mochawesome-merge';
const report = require('mochawesome-report-generator');
const { merge } = require('mochawesome-merge')
// Generate an HTML report from the JSON file
report.create({
  reportDir: './mochawesome-report',
  reportTitle: 'My Test Report',
  reportFilename: 'my-test-report',
  charts: true,
  inline: true
});
//const merge = require('mochawesome-merge');

// Merge multiple JSON report files into a single file
const reportFiles = ['./mochawesome-report/mochawesome.json', './mochawesome-report/mochawesome-1.json'];

// Merge the report files
//const mergedReport = merge(reportFiles);

// Save the merged report to a file
const fs = require('fs');
fs.writeFileSync('./mochawesome-report/mochawesome-merged.json', JSON.stringify( null));
