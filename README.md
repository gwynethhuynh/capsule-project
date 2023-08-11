# Setup 
- https://medium.com/@obrm770/setting-up-a-full-stack-react-node-js-project-a-comprehensive-cheat-sheet-ee326576c21a

## Running
- Run `npm run dev` 

## MySQL Design
1. Ratings Table
- `shirt_id`
- `bottom_id`
- `rating`

2. Shirts Table
- `shirt_id`
- `shirt_file_name` : file name amazon s3 uses to fetch image link
- `shirt_img_link` : amazon s3 link to shirt image

3. Bottoms Table
- `bottom_id`
- `bottom_name` : file name amazon s3 uses to fetch image link
- `bottom_img` : : amazon s3 link to bottom image

4. Tips
- Executing MySQL script from command line after connecting to root: https://www.baeldung.com/linux/execute-sql-script-command-line
- Nodejs x MySQL tutorial: https://codeforgeek.com/nodejs-mysql-tutorial/  

## Amazon S3 to Store Images
- Source: https://www.sammeechward.com/storing-images-in-s3-from-node-server 
1. Create a bucket
2. type `vim ~/.aws/config` into terminal to view the profile and sso-sessions.

## Nodejs 
- Source: https://blog.logrocket.com/build-rest-api-node-express-mysql/ 
## Nodejs Issues
1. dotenv was not loading environment variables
- Solution: get current directory and append that to relative path to config.env file
- https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
- https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables 

## MySQL Issues
1. Client does not support authentication protocol requested by server; consider upgrading MySQL client
- Source: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server 

### How to connect to Root
1. How to fix command not found mysql
- Source: https://stackoverflow.com/questions/35858052/how-to-fix-command-not-found-mysql-in-zsh 
- Solution: append MySQL path to environment variables
- `export PATH=${PATH}:/usr/local/mysql/bin/` 
2. Next run `mysql -u root -p` and input your password
- If you forget your password, follow the steps here to reset it: https://dev.mysql.com/doc/refman/8.1/en/resetting-permissions.html 

## AWS S3 Issues
1. Update Credentials
- Login to user and click `Command line or programmatic access` to gain aws_access_key_id, aws_secret_access_key, and aws_session_token.
- Copy and paste these values into `~/.aws/credentials`.
- Change profile to [default].
- Token expires every hour.
### Sources: