/*
 * Laboratorio SAST con Bearer – Parte D
 * Ruta de demostración CORREGIDA: consulta parametrizada.
 */

import { type Request, type Response, type NextFunction } from 'express'
import * as models from '../models/index'

export function buscarUsuarioPorEmail () {
  return (req: Request, res: Response, next: NextFunction) => {
    const email = String(req.query.email ?? '')
    // CORREGIDO: se usa un parámetro enlazado (bind/replacement); la entrada nunca forma parte del SQL
    models.sequelize.query('SELECT id, email, role FROM Users WHERE email = :email', {
      replacements: { email }
    })
      .then(([usuarios]: any) => res.json({ status: 'success', data: usuarios }))
      .catch((error: Error) => { next(error) })
  }
}
