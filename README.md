# branch

Makes Backlog related branch information available to other actions in your workflow.

## Usage

Use the action in your workflow with your API token:

```yaml
name: workflow-name
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  job_name:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: bklg-actions/branch-info@v1
        id: branch
        with:
          api_token: ${{secrets.BKLG_API_TOKEN}}
      - name: echo branch variables
        run: echo task_id=$TASK_ID
        env:
          TASK_ID: ${{steps.branch.outputs.task_id}}
```

See [action.yml](/bklg-actions/branch-info/blob/master/action.yml) for a full list of inputs and outputs.

## Contributing

Issue reports and pull requests are welcome on GitHub at https://github.com/bklg-actions/branch-info.

## License

This work is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
