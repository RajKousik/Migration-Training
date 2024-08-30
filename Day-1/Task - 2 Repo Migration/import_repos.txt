#!/bin/bash

# GitHub organization/user and GitLab group
GITHUB_ORG="RajKousik"
GITLAB_GROUP="test2624135"

# GitLab personal access token
GITLAB_TOKEN="glpat-9vkx2PhTbzQDYX4KZtJ4"

# List of repositories to import
REPOS=(
    "Data-Training"
    "HTML-Demo"
    # "repo3"
)

# GitLab URL (without the trailing slash)
GITLAB_URL="https://gitlab.com"


for REPO in "${REPOS[@]}"
do
    # Clone the GitHub repository
    git clone "https://github.com/$GITHUB_ORG/$REPO.git"

    # Create a new project in GitLab
    curl --header "Private-Token: $GITLAB_TOKEN" --data "name=$REPO&namespace_id=$(curl --header \"Private-Token: $GITLAB_TOKEN\" \"$GITLAB_URL/api/v4/groups?search=$GITLAB_GROUP\" | jq '.[0].id')" "$GITLAB_URL/api/v4/projects"

    # Change directory to the cloned repo
    cd "$REPO"

    # Add GitLab as a remote
    git remote add gitlab "$GITLAB_URL/rajkousik20/$REPO.git"

    # Push all branches to GitLab
    git push --all gitlab

    # Push tags to GitLab
    git push --tags gitlab

    # Go back to the previous directory
    cd ..

    # Optionally remove the local clone
    rm -rf "$REPO"
done
