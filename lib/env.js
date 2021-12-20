const determineBranchName = (context) => {
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

const determineRepositoryFullName = (context) => {
  return context.payload.repository.full_name;
}

module.exports = {
  determineBranchName,
  determineRepositoryFullName
}
