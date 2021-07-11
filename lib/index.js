const core = require('@actions/core');
const github = require('@actions/github');
const parseBranchName = require('./branch');

async function run() {
  try {
    if (github.context.payload.pull_request) {
      const branchName = github.context.payload.pull_request.head.ref;
      const parsedBranch = parseBranchName(branchName);

      if (parsedBranch) {
        core.setOutput('branch_name', parsedBranch.name);
        core.setOutput('branch_type', parsedBranch.type);
        core.setOutput("branch_is_ignored", parsedBranch.isIgnored);
        core.setOutput('branch_task_id', parsedBranch.taskId);
      } else {
        core.info(`Branch name ${branchName} could not be parsed.`);
      }
    } else {
      core.info("This action only supports pull requests at this time.");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
