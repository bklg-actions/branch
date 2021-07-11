const core = require('@actions/core');
const { context } = require('@actions/github');
const parseBranchName = require('./branch');

const determineBranchName = () => {
  switch (context.eventName) {
    case 'pull_request':
      return context.payload.pull_request.head.ref;
    case 'delete':
      if (context.payload.ref_type !== 'branch') {
        throw `This action does not support the ${context.payload.ref_type} ref type`;
      }

      return context.payload.ref;
    default:
      throw `This action does not support the ${context.eventName} event type`;
  }
}

async function run() {
  try {
    core.debug(context);

    let branchName = determineBranchName();
    const parsedBranch = parseBranchName(branchName);

    if (parsedBranch) {
      core.setOutput('id', parsedBranch.id);
      core.setOutput("ignored", parsedBranch.ignored);
      core.setOutput('matched', true);
      core.setOutput('name', parsedBranch.name);
      core.setOutput('type', parsedBranch.type);
    } else {
      core.setOutput('matched', false);
      core.info(`Branch name ${branchName} could not be parsed.`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
