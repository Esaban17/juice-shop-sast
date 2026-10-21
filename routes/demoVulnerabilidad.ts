/*
 * Laboratorio SAST con Bearer – Parte D
 * Ruta de demostración con una vulnerabilidad INTENCIONAL (SQL Injection).
 */

import { type Request, type Response, type NextFunction } from 'express'
import * as models from '../models/index'

export function buscarUsuarioPorEmail () {
  return (req: Request, res: Response, next: NextFunction) => {
    const email = req.query.email
    // VULNERABLE: la entrada del usuario se concatena directamente en la consulta SQL
    models.sequelize.query('SELECT id, email, role FROM Users WHERE email = \'' + email + '\'')
      .then(([usuarios]: any) => res.json({ status: 'success', data: usuarios }))
      .catch((error: Error) => { next(error) })
  }
}
