import config from "@/api/config"
import { logInfo } from "@/api/utils/createLogger"
import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"
import PostModel from "@/db/models/PostModel"
import CommentModel from "@/db/models/CommentModel"
import knex from "knex"

export const createContext = ({ req, res, next, requestId, logger }) => {
  const send = (result, meta = {}) => {
    res.send({
      result: Array.isArray(result) ? result : [result],
      meta,
    })
  }
  const db = knex(config.db)

  if (config.isDevMode) {
    db.on("query", ({ sql, bindings }) =>
      logInfo({ type: "SQL", requestId, sql, bindings }),
    )
  }

  BaseModel.knex(db)

  return {
    requestId,
    req,
    res,
    next,
    send,
    db,
    models: {
      UserModel,
      PostModel,
      CommentModel,
    },
    logger,
  }
}
