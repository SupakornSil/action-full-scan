const core = require('@actions/core');
const exec = require('@actions/exec');
const common = require('@zaproxy/actions-common-scans');
const _ = require('lodash');

// Default file names
let jsonReportName = 'report_json.json';
let mdReportName = 'report_md.md';
let htmlReportName = 'report_html.html';

async function run() {

    try {
        let workspace = core.getInput('generate_report_dir');
        let currentRunnerID = process.env.GITHUB_RUN_ID;
        let repoName = process.env.GITHUB_REPOSITORY;
        let token = core.getInput('token');
        let rulesFileLocation = core.getInput('rules_file_name');
        let issueTitle = core.getInput('issue_title');
        let createIssue = true;

        let plugins = [];
        
        await common.main.processReport(token, workspace, plugins, currentRunnerID, issueTitle, repoName, createIssue);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
