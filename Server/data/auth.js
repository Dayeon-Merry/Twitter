// abcd1234: 
let users = [
    {
        id: '1',
        username: 'melon',
        password: '$2b$10$6ZJ3wj51qEgEbXm1PPGl8OZsjNVHBj57o93BcfaePjSji4jX6v/wu',
        name: '이메론',
        email: 'melon@email.com',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU'
    }
];

export async function findByUsername(username) {
    return users.find((user) => user.username === username)
}

export async function createUser(user){
    const created = {...user, id: Date.now().toString()}
    users.push(created)
    return created.id;
}

export async function findById(id){
    return users.find((user) => user.id === id);
}