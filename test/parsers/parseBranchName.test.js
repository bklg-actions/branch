const { parseBranchName } = require('../../lib/parsers');

test('parses task branches correctly', async () => {
  expect(parseBranchName('1234_task_branch')).toEqual(
    expect.objectContaining({
      name: '1234_task_branch',
      ignored: false,
      type: 'task',
      id: '1234'
    })
  );
});

test('parses project branches correctly', async () => {
  expect(parseBranchName('p4321_project_branch')).toEqual(
    expect.objectContaining({
      name: 'p4321_project_branch',
      ignored: false,
      type: 'project',
      id: '4321'
    })
  );
});

test('parses effort branches correctly', async () => {
  expect(parseBranchName('e5678_effort_branch')).toEqual(
    expect.objectContaining({
      name: 'e5678_effort_branch',
      ignored: false,
      type: 'effort',
      id: '5678'
    })
  );
});

test('parses ignored branches correctly', async () => {
  expect(parseBranchName('x1234_task_branch')).toEqual(
    expect.objectContaining({
      name: 'x1234_task_branch',
      ignored: true,
      type: null,
      id: '1234'
    })
  );
});
