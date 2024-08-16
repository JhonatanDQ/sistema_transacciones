export const getUser = (req, res) => {
    res.send('getting users')
}

export const createUser = (req, res) => {
    console.log(req.body)
    res.send('creating users')
}

