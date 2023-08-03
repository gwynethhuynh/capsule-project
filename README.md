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
- `shirt_name`
- `shirt_img` : amazons3 link to shirt image

3. Bottoms Table
- `bottom_id`
- `bottom_name`
- `bottom_img` : : amazons3 link to shirt image

4. Tips
- Executing MySQL script from command line after connecting to root: https://www.baeldung.com/linux/execute-sql-script-command-line
- Nodejs x MySQL tutorial: https://codeforgeek.com/nodejs-mysql-tutorial/  

## Amazon S3 to Store Images
1. Create a bucket
2. 

## Nodejs 
- Source: https://blog.logrocket.com/build-rest-api-node-express-mysql/ 
## Nodejs Issues
1. dotenv was not loading environment variables
- Solution: get current directory and append that to relative path to config.env file
- https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
- https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables 

## MySQL issues
1. Client does not support authentication protocol requested by server; consider upgrading MySQL client
- Source: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server 
- 
### Sources: