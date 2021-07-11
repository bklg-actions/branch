const parseBranchName = require('../lib/branch');

test('parses task branches correctly', async () => {
  expect(parseBranchName('1234_task_branch')).toEqual(
    expect.objectContaining({
      name: '1234_task_branch',
      isIgnored: false,
      type: 'task',
      taskId: '1234'
    })
  );
});

test('parses project branches correctly', async () => {
  expect(parseBranchName('p4321_project_branch')).toEqual(
    expect.objectContaining({
      name: 'p4321_project_branch',
      isIgnored: false,
      type: 'project',
      taskId: '4321'
    })
  );
});

test('parses effort branches correctly', async () => {
  expect(parseBranchName('e5678_effort_branch')).toEqual(
    expect.objectContaining({
      name: 'e5678_effort_branch',
      isIgnored: false,
      type: 'effort',
      taskId: '5678'
    })
  );
});

test('parses ignored branches correctly', async () => {
  expect(parseBranchName('x1234_task_branch')).toEqual(
    expect.objectContaining({
      name: 'x1234_task_branch',
      isIgnored: true,
      type: null,
      taskId: '1234'
    })
  );
});
