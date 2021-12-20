const parseBranchName = (branchName) => {
  const result = branchName.match(/^([iepx]?)(\d+)_/);
  if (result === null) {
    return false;
  }

  let branchType;

  switch (result[1]) {
    case 'e':
      branchType = 'effort';
      break;
    case 'p':
      branchType = 'project';
      break;
    case 'x':
      branchType = null;
      break;
    default:
      branchType = 'task';
  }

  return {
    name: branchName,
    id: result[2],
    ignored: result[1] === 'x',
    type: branchType
  };
};

const parseGithubRef = (ref) => {
  const result = ref.match(/refs\/pull\/(\d+)\/merge/)
  if (result === null) {
    return false;
  }

  return {
    pullRequestNumber: result[1],
  };
};

module.exports = {
  parseBranchName,
  parseGithubRef
};
