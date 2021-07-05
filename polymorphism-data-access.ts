import {randomBytes} from 'crypto'
import {Collection, Db} from 'mongodb'

type Product = { name: string; id: string }

interface ProductsListInterface {
    findAll(): Promise<Product[]>
    findOne(id: string): Promise<Product | undefined>

    save(product: Omit<Product, 'id'>): Promise<string>
}

class InMemoryProductsList implements ProductsListInterface {
    private memoryProductList: Product[] = []

    async save(product: Omit<Product, 'id'>): Promise<string> {
        const randomId = randomBytes(4).toString('hex')

        this.memoryProductList = [ ...this.memoryProductList, {
            ...product,
            id: randomId
        } ]

        return randomId
    }

    async findAll(): Promise<Product[]> {
        return this.memoryProductList
    }

    async findOne(id: string): Promise<Product | undefined> {
        return this.memoryProductList.find(p => p.id === id)
    }
}

class MongoProductsList implements ProductsListInterface {
    constructor(private readonly collection: Collection) {}

    findAll(): Promise<Product[]> {
        // You should map the representation of Product
        // in MongoDB to the type declared previously.
        return this.collection.find().toArray()
    }

    findOne(id: string): Promise<Product | undefined> {
        return this.collection.findOne({ id })
    }

    async save(product: Omit<Product, "id">): Promise<string> {
        // We could also let mongodb create an id
        // if it fits with the return type of this method.
        const randomId = randomBytes(4).toString('hex')

        await this.collection.insertOne({
            ...product,
            id: randomId
        })

        return randomId
    }
}

const memoryProductsList = new InMemoryProductsList()

memoryProductsList.save({ name: 'My product' })
    .then(id => memoryProductsList.findOne(id))
    .then(foundProduct => console.log(foundProduct))

// It will not work since you need to create the mongo client and working mongodb instance.
// const mongoProductsList = new MongoProductsList(/* create the connection, the db and give a collection */)
//
// mongoProductsList.save({ name: 'My product' })
//     .then(id => mongoProductsList.findOne(id))
//     .then(foundProduct => console.log(foundProduct))
