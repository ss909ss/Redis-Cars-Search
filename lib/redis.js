import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Car extends Entity {}
let schema = new Schema(
    Car,
    {
        CarBrand:{type:'string'},
        CarClass:{type:'string'},
        CarCost:{type:'string'},
        Image: {type:'string'},
        Description: {type:'string',textSearch:true},

    },
    {
        dataStructure:'JSON',
    }
);

export async function createCar(data) {
    await connect();

    const repository = new Repository(schema,client);

    const car = repository.createEntity(data);

    const id = await repository.save(car);
    return id;
}

export async function createIndex() {
    await connect();

    const repository = new Repository(schema,client);
    await repository.createIndex()
}

export async function searchCars(q) {
    await connect();

    const repository = new Repository(schema,client);

    const cars = await repository.search()
        .where('CarBrand').eq(q)
        .or('CarClass').eq(q)
        .or('CarCost').eq(q)
        .or('Description').matches(q)
        .return.all();

    console.log('Cars found:', cars);

    return cars;
}





