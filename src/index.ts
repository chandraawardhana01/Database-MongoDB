// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import mongodb from 'mongodb'
import { Customer, CustomerType } from './mongodb'
import { Transaction, TransactionType } from './mongodb'

async function initApp() {
  const app = express()

  //init db
  const connection = await mongodb.connect(`${process.env.MONGODB_URI}`, { useUnifiedTopology: true })
  const db = connection.db(`${process.env.MONGODB_NAME}`)
  const customerModel = new Customer(db)
  const transactionModel = new Transaction(db)

  app.use(bodyParser.json())

  app.post('/customer', async function(req, res, next) {
    try {
      await customerModel.create(req.body)
    } catch (error) {
      return next(error)
    }

    return res.send({ success: true })
  })

  app.get('/customer', async function(req, res, next) {
    let customers: CustomerType[]
    try {
      customers = await customerModel.getAll()
    } catch (error) {
      return next(error)
    }

    return res.send(customers)
  })

  app.get('/customer/:id', async function(req, res, next) {
    let customer: CustomerType | null
    try {
      customer = await customerModel.getByID(req.params.id)
    } catch (error) {
      return next(error)
    }

    return res.send(customer)
  })

  app.put('/customer/:id', async function(req, res, next) {
    try {
      await customerModel.update(req.params.id, req.body)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  app.delete('/customer/:id', async function(req, res, next) {
    try {
      await customerModel.delete(req.params.id)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  //CRUD
  app.post('/transaction', async function(req, res, next) {
    try {
      await transactionModel.create(req.body)
    } catch (error) {
      return next(error)
    }

    return res.send({ success: true })
  })

  app.get('/transaction', async function(req, res, next) {
    let transactions: TransactionType[]
    try {
      transactions = await transactionModel.getAll()
    } catch (error) {
      return next(error)
    }

    return res.send(transactions)
  })

  app.get('/transaction/:id', async function(req, res, next) {
    let transactions: TransactionType | null
    try {
      transactions = await transactionModel.getByID(req.params.id)
    } catch (error) {
      return next(error)
    }

    return res.send(transactions)
  })

  app.put('/transaction/:id', async function(req, res, next) {
    try {
      await transactionModel.update(req.params.id, req.body)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  app.delete('/transaction/:id', async function(req, res, next) {
    try {
      await transactionModel.delete(req.params.id)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })






  

  app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send({
      success: false,
      message: err.message
    })
  })

  app.listen(process.env.PORT || 8000, () => {
    console.log(`App listen on port ${ process.env.PORT || 8000 }`)
  })
}

initApp()