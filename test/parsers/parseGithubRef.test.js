const { parseGithubRef } = require('../../lib/parsers');

test('parses Github ref correctly', async () => {
  expect(parseGithubRef('refs/pull/12345/merge')).toEqual(
    expect.objectContaining({
      pullRequestNumber: '12345'
    })
  );
});
