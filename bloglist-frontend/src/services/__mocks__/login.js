let token = null

const users = [
{
  id:"abcd123",
  username: "alicat",
  name: "Allison McElroy",
  adult: true,
  passwordHash: "$2a$10$0rRz0RiALe/cPYJVD0WSVOAidVvWQMd.odwDrlXuQSDJk5tgtZtT." 
},
{
  id:"efg456",
  username: "McMuffin",
  name: "Sarah Smith",
  adult: true, 
  passwordHash: "$2a$10$PVT7KjGqDRJYexWSPdn.X.G7ePYWT0EAp5SpQu6Btuwxa8v6ZCvpS"
}

]

const getAll = () => {
  return Promise.resolve(users)
}

export default { getAll, users}