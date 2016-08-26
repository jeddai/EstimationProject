# Estimation Project
Hello! Here is an explanation of how to use our Estimation Project

1. Download NodeJS and MongoDB
2. Set up MongoDB
    - Download [Homebrew](http://brew.sh/) and run `brew update`, followed by `brew install mongodb`
    - Run the following commands:
    ```
    cd /
    sudo mkdir data
    cd data
    sudo mkdir db
    cd ..
    sudo chown -R $(whoami) data
    ```
    - Run MongoDB using the `mongod` command
3. Make sure you have NodeJS and NPM installed using `npm -v` or `node -v`
    - If it is not installed you can download it [here](https://nodejs.org/dist/v4.5.0/node-v4.5.0.pkg)
4. Run `npm start` in the `Estimation Project` directory
5. Navigate to `localhost:3000`
    - Add professors and publications from the web interface