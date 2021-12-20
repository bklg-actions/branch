const core = require('@actions/core');
const { context } = require('@actions/github');
const env = require('./env')
const parsers = require('./parsers');

async function run() {
  try {
    console.log(context);
    core.debug(context)

    const branchName = env.determineBranchName(context);
    const repositoryFullName = env.determineRepositoryFullName(context);
    const parsedGithubRef = parsers.parseGithubRef(context.ref);
    const parsedBranch = parsers.parseBranchName(branchName);

    if (repositoryFullName) {
      core.setOutput("repository_full_name", repositoryFullName);
    }

    if (parsedGithubRef) {
      core.setOutput("pull_request_number", parsedGithubRef.pullRequestNumber);
    }

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
