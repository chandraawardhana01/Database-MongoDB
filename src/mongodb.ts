import mongodb from 'mongodb'

export type CustomerType = {
  First_name: string
	last_name: string
	age: number
	customer_type: string
	street: string
	city: string
	state: string
	zip_code: string
	phone_number: string
}
export type TransactionType = {
  amount  : string
  date  : string
  description : string
}

export class Customer {
  private collection: mongodb.Collection<CustomerType>

  constructor(db: mongodb.Db) {
    this.collection = db.collection('customer')
  }

  async create(data: CustomerType) {
    try {
      const result = await this.collection.insertOne(data)
      console.log('Insert result %j', result)
    } catch (error) {
      throw error
    }
  }

  async getAll() {
    let customers: CustomerType[]
    try {
      customers = await this.collection.find().toArray()
    } catch (error) {
      throw error
    }

    return customers
  }

  async getByID(customerID: string) {
    let customer: CustomerType | null
    try {
      customer = await this.collection.findOne({ _id: new mongodb.ObjectID(customerID) })
    } catch (error) {
      throw error
    }

    return customer
  }

  async update(customerID: string, updateData: Partial<CustomerType>) {
    try {
      await this.collection.updateOne({ _id: new mongodb.ObjectID(customerID) }, { $set: updateData })
    } catch (error) {
      throw error
    }
  }


  async delete(customerID: string) {
    try {
      await this.collection.deleteOne({ _id: new mongodb.ObjectID(customerID) })
    } catch (error) {
      throw error
    }
  }
}

//

export class Transaction {
  private collection: mongodb.Collection<TransactionType>

  constructor(db: mongodb.Db) {
    this.collection = db.collection('transaction')
  }

  async create(data: TransactionType) {
    try {
      const result = await this.collection.insertOne(data)
      console.log('Insert result %j', result)
    } catch (error) {
      throw error
    }
  }

  async getAll() {
    let transactions: TransactionType[]
    try {
      transactions = await this.collection.find().toArray()
    } catch (error) {
      throw error
    }

    return transactions
  }

  async getByID(transactionID: string) {
    let transaction: TransactionType | null
    try {
      transaction = await this.collection.findOne({ _id: new mongodb.ObjectID(transactionID) })
    } catch (error) {
      throw error
    }

    return transaction
  }

  async update(transactionID: string, updateData: Partial<TransactionType>) {
    try {
      await this.collection.updateOne({ _id: new mongodb.ObjectID(transactionID) }, { $set: updateData })
    } catch (error) {
      throw error
    }
  }


  async delete(transactionID: string) {
    try {
      await this.collection.deleteOne({ _id: new mongodb.ObjectID(transactionID) })
    } catch (error) {
      throw error
    }
  }
}