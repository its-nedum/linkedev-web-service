# Linked Dev Web Service

## Introduction

**Linked Dev** is a platform that allows users (software developers) to create a public profile stating their skill set, years of experience, and a brief summary of them. Every internet user can access this profile, including recruiters and their potential employers.
The name was coined from [LinkedIn](https://www.linkedin.com) (a social networking website for business people to communicate).

## Live Link

[Linked Dev - Server](https://linkedev-api-service.onrender.com) `https://linkedev-api-service.onrender.com`

[Linked Dev - Client](https://linked-dev.netlify.app/) `https://linked-dev.netlify.app/`

## Repository
- **Server** [Repo](https://github.com/its-nedum/linkedev-web-service)
- **Client** [Repo](https://github.com/its-nedum/linkedev-web-client)

## Installation

To install Linked dev follow these steps
1. Clone the repository from GitHub
```bash
$ git clone https://github.com/its-nedum/linkedev-web-service.git
```
2. Navigate to the project directory
```bash
$ cd linkedev-web-service
```
3. Install the required dependencies
```bash
$ npm install
```

## Envronment Variables
Linked dev web service requires the following in your `.env`

`PORT`: Port number
`MONGODB_URI`: MongoDB connection uri
`JWT_SECRET`: JSON Web Tokens secret
`JWT_EXPIRY`: JSON Web Tokens expiry duration

## Usage

To start the development server, run the following command

```bash
$ npm run dev
```
This command will compile the TypeScript code into JavaScript with the `--watch` flag and start up the server using `nodemon`

This will start the development server on `http://localhost:{PORT}`

## API Routes
The table below shows the API endpoints and their functionalities on the web service.

<table>
	<thead>
		<th>HTTP VERB</th>
		<th>API ENDPOINT</th>
		<th>FUNCTIONALITY</th>
	</thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/api/v1/users</td>
            <td>Create a user profile</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/v1/users</td>
            <td>Fetch all users profile</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/v1/user/:id</td>
            <td>Fetch a user profile</td>
        </tr>
        <tr>
            <td>PATCH</td>
            <td>/api/v1/user/:id</td>
            <td>Update a user profile</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/v1/user/:id</td>
            <td>Delete a user profile</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/v1/register</td>
            <td>Create a user account</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/v1/login</td>
            <td>Sign user into their account</td>
        </tr>
    </tbody>
</table>

## Learn More About Technologies Used

To learn more please check out the following documentations

- **NodeJs** [Docs](https://nodejs.dev/en/api/v19/documentation/)
- **TypeScript** [Docs](https://www.typescriptlang.org/docs/)
- **JavaScript** [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **MongoDB** [Docs](https://www.mongodb.com/docs/)
- **Mongoose** [Docs](https://mongoosejs.com/docs/)

## License

MIT