let parseBranchName = function (branchName) {
  const branchMatch = branchName.match(/^([iepx]?)(\d+)_/);
  if (branchMatch === null) {
    return false;
  }

  return {
    name: branchName,
    id: branchMatch[2],
    ignored: branchMatch[1] === 'x',
    type: determineBranchType(branchMatch[1])
  };
};

let determineBranchType = function(branchModifier) {
  switch (branchModifier) {
    case 'e':
      return 'effort';
    case 'p':
      return 'project';
    case 'x':
      return null;
    default:
      return 'task';
  }
}

module.exports = parseBranchName;
