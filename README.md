# core
[![Backend](https://github.com/htl-grieskirchen-core/core/actions/workflows/backend.yml/badge.svg)](https://github.com/htl-grieskirchen-core/core/actions/workflows/backend.yml)
[![Frontend](https://github.com/htl-grieskirchen-core/core/actions/workflows/frontend.yml/badge.svg)](https://github.com/htl-grieskirchen-core/core/actions/workflows/frontend.yml)
[![pre-commit](https://github.com/htl-grieskirchen-core/core/actions/workflows/pre-commit.yml/badge.svg)](https://github.com/htl-grieskirchen-core/core/actions/workflows/pre-commit.yml)

## Branches

For new branches use the correct prefix:

* Branches for new features should be called `feature/a-few-words`
* Branches for bug fixes should be called `bug/a-few-words`
* Branches for documentation changes should be called `docs/a-few-words`

GitHub branch names should use kebab-case, so words should be separated by a hyphen `-`.

## Pre-commit hooks

We use [pre-commit](https://pre-commit.com/) to run a number of checks before each commit.
These checks are also run on CI. It is strongly recommended to install pre-commit as described below to **avoid
unnecessary cleanup commits**.

### Install pre-commit

> ⚠ [Python 3](https://www.python.org/downloads/windows/) has to be installed on the development machine.

Run the following commands in a terminal **inside the project directory** to install the pre-commit hooks:

```bash
pip install pre-commit
pre-commit install
```

The first run can take a while, as it installs all the hooks.

## Techstack

As specified by the coaching teachers:

* C# + ASP.NET Core
* Angular
