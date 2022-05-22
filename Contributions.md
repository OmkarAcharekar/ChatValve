# ChatValve Contribution Guide


### Working on issue

* Make your changes in a new git branch:

  ```text
    git checkout -b name/issue-tracker/short-description master
  ```

  Name can be initials or GitHub username. An example of this could be:

  ```text
    git checkout -b omkaracharekar/i34/message  master
  ```


### Keeping In Sync

It is good practice to always keep your `origin/master` in sync with `upstream/master`. You don’t have to, but it makes your life easier. Do your work in branches of your fork, and periodically sync up your `master` with the `master` of `upstream` as follows. You should definitely do this before creating a pull request.

```shell
    git checkout master
    git fetch --all --prune
    git rebase upstream/master
    git push origin master
```


## <a name="commits"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more readable messages** that are easy to follow when looking through the **project history** and **git logs**.

The commit message formatting can be added using a version of typical git workflow.

### Commit Message Format
Each commit message consists of a mandatory **type**, **scope**, **subject**, and **footer**. This is a specific format:

```shell
    <type>(<scope>): <subject> - <footer>
```


This allows the message to be easier to read on GitHub as well as in various git tools.

 An example of this could be:

```shell

git commit -m "fix(ChatRoomItem/index.ts): added condition to handle undefined value -i34"
    
```



### Type
Must be one of the following:

* **`feat`**: A new feature
* **`fix`**: A bug fix
* **`style`**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **`refactor`**: A code change that neither fixes a bug nor adds a feature
* **`perf`**: A code change that improves performance


### Scope
The scope will be specifying the place of the commit change; the focal point of new code or best  description for where changes can be found.

You can use `*` when the change affects more than a single scope.

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* kept under 50 characters
* no dot (.) at the end

### Footer
The footer should contain reference GitHub Issues that this commit addresses.





## <a name="pullrequests"></a> GitHub Pull Request Guidelines
Pull Requests should consist of a complete addition to the code which contains value. Because the commits inside follow a pattern, the title should be an extension or summary of all the commits inside.

Pull Request titles should follow commit message formatting.

Formatting for the body is displayed in this example:

```shell
<!--- Provide a formatted commit message describing this PR in the Title above -->
<!--- See our DEVELOPERS guide below: -->
# Closes #<CORRESPONDING ISSUE NUMBER>
<!--- Provide an overall summary of the pull request -->

### Changes
<!--- More detailed and granular description of changes -->
<!--- These should likely be gathered from commit message summaries -->
- <ONE>
- <TWO>

### Flags
<!--- Provide context or concerns a reviewer should be aware of, such as breaking changes -->
- <ONE>
- <TWO>

### Related Issues
<!--- Link any issues or pull requests relating to this -->
- Issue #<NUMBER>
- Pull Request #<NUMBER>









