import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const validateResult = (req: Request, res: Response, next: NextFunction): any => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  next()
}

export { validateResult }
