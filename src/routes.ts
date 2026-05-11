import {Router} from "express"

const routes = Router()

routes.get("/", (request, response) => response.status(200).json({success:true}))

export default routes