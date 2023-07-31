export const SOCKET_ENDPOINT = "http://localhost:3006";
// export const SOCKET_ENDPOINT = "https://instagrammern.herokuapp.com";

export const stories = [
    {
        title: "JavaScript",
        image: "javascript"
    },
    {
        title: "Node.js",
        image: "nodejs"
    },
    {
        title: "Express.js",
        image: "expressjs"
    },
    {
        title: "MongoDB",
        image: "mongodb"
    },
    {
        title: "React.js",
        image: "reactjs"
    },
    {
        title: "Socket.io",
        image: "socketio"
    },
    {
        title: "TailwindCSS",
        image: "tailwind"
    },
    {
        title: "Heroku",
        image: "heroku"
    },
    {
        title: "MaterialUI",
        image: "mui"
    },
    {
        title: "Redux",
        image: "redux"
    },
    {
        title: "Multer",
        image: "multer"
    },
    {
        title: "AWS S3",
        image: "aws-s3"
    },
    {
        title: "Sendgrid",
        image: "sendgrid"
    },
    {
        title: "Axios",
        image: "axios"
    },
    {
        title: "Toastify",
        image: "toastify"
    },
]

export const IMAGE_PUBLIC="http://localhost:3006/uploads/";
export const getImage=(avatar)=>{
    return `http://localhost:3006/uploads/${avatar}`
}